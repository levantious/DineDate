// import { onReceiveMessage, sendMessage, startConnection } from '@/common/services';
import React, { useCallback, useEffect, useReducer } from 'react'
import { Alert, Linking, Platform, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import {
    GiftedChat,
    IMessage,
    Send,
    SendProps,
    SystemMessage,
} from 'react-native-gifted-chat'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import earlierMessages from '@/fake-data/earlierMessages'
import messagesData from '@/fake-data/messages'
import * as Clipboard from 'expo-clipboard'
import { Message } from '../types';
import { ChatHeader } from './chat-header'
import { chatFeature } from '../instance'



const user = {
    _id: 1,
    name: 'Developer',
}


interface IState {
    messages: any[]
    step: number
    loadEarlier?: boolean
    isLoadingEarlier?: boolean
    isTyping: boolean
}
enum ActionKind {
    SEND_MESSAGE = 'SEND_MESSAGE',
    RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
    LOAD_EARLIER_MESSAGES = 'LOAD_EARLIER_MESSAGES',
    LOAD_EARLIER_START = 'LOAD_EARLIER_START',
    SET_IS_TYPING = 'SET_IS_TYPING',
    // LOAD_EARLIER_END = 'LOAD_EARLIER_END',
}
// An interface for our actions
interface StateAction {
    type: ActionKind
    payload?: any
}

function reducer(state: IState, action: StateAction) {
    switch (action.type) {
        case ActionKind.SEND_MESSAGE: {
            return {
                ...state,
                step: state.step + 1,
                messages: action.payload,
            }
        }
        case ActionKind.RECEIVE_MESSAGE: {
            return {
                ...state,
                step: state.step + 1,
                messages: action.payload,
            }
        }
        case ActionKind.LOAD_EARLIER_MESSAGES: {
            return {
                ...state,
                loadEarlier: true,
                isLoadingEarlier: false,
                messages: action.payload,
            }
        }
        case ActionKind.LOAD_EARLIER_START: {
            return {
                ...state,
                isLoadingEarlier: true,
            }
        }
        case ActionKind.SET_IS_TYPING: {
            return {
                ...state,
                isTyping: action.payload,
            }
        }
    }
}

export function ChatWidget() {

    useEffect(() => {
        chatFeature.startConnection();
        chatFeature.onReceiveMessage((user, message) => {
            console.log("received message");
            const receivedMessage = {
                _id: Math.random().toString(36).substring(7),
                text: message,
                createdAt: new Date(),
                user: {},
            };
            // dispatch({
            //     type: ActionKind.RECEIVE_MESSAGE,
            //     payload: [receivedMessage, ...state.messages],
            // });
        });
        return () => {
            chatFeature.stopConnection();
        };
    }, []);

    const [state, dispatch] = useReducer(reducer, {
        messages: messagesData,
        step: 0,
        loadEarlier: true,
        isLoadingEarlier: false,
        isTyping: false,
    })


    //-=-=-=-=-=-=-=-=-=-=-=
    const onSend = useCallback(
        async (messages: any[]) => {
            if (messages.length > 0) {
                const message = messages[0];
                // Append the message locally
                const sentMessages = [{ ...message, sent: true, received: true }];
                const newMessages = GiftedChat.append(
                    state.messages,
                    sentMessages,
                    Platform.OS !== "web"
                );

                dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });

                // Send the message using SignalR
                try {
                    console.log(message)
                    await chatFeature.sendMessage(message.user.name, message.text);
                } catch (error) {
                    console.error("Failed to send message:", error);
                }
            }
        },
        [dispatch, state.messages]
    );

    const onLoadEarlier = useCallback(() => {
        dispatch({ type: ActionKind.LOAD_EARLIER_START })
        setTimeout(() => {
            const newMessages = GiftedChat.prepend(
                state.messages,
                earlierMessages() as any,
                Platform.OS !== 'web'
            )

            dispatch({ type: ActionKind.LOAD_EARLIER_MESSAGES, payload: newMessages })
        }, 1500) // simulating network
        // }, 15000) // for debug with long loading
    }, [dispatch, state.messages])

    const parsePatterns = useCallback(() => {
        return [
            {
                pattern: /#(\w+)/,
                style: { textDecorationLine: 'underline', color: 'darkorange' },
                onPress: () => Linking.openURL('http://gifted.chat'),
            },
        ]
    }, [])

    const onLongPressAvatar = useCallback((pressedUser: any) => {
        Alert.alert(JSON.stringify(pressedUser))
    }, [])

    const onPressAvatar = useCallback(() => {
        Alert.alert('On avatar press')
    }, [])

    const handleLongPress = useCallback((context: unknown, currentMessage: any) => {
        if (!currentMessage.text)
            return

        const options = [
            'Copy text',
            'Cancel',
        ]

        const cancelButtonIndex = options.length - 1

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ; (context as any).actionSheet().showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                (buttonIndex: number) => {
                    switch (buttonIndex) {
                        case 0:
                            Clipboard.setStringAsync(currentMessage.text)
                            break
                        default:
                            break
                    }
                }
            )
    }, [])

    const onQuickReply = useCallback((replies: any[]) => {
        const createdAt = new Date()
        if (replies.length === 1)
            onSend([
                {
                    createdAt,
                    _id: Math.round(Math.random() * 1000000),
                    text: replies[0].title,
                    user,
                },
            ])
        else if (replies.length > 1)
            onSend([
                {
                    createdAt,
                    _id: Math.round(Math.random() * 1000000),
                    text: replies.map(reply => reply.title).join(', '),
                    user,
                },
            ])
        else
            console.warn('replies param is not set correctly')
    }, [])

    const renderQuickReplySend = useCallback(() => {
        return <Text>{' custom send =>'}</Text>
    }, [])

    const setIsTyping = useCallback(
        (isTyping: boolean) => {
            dispatch({ type: ActionKind.SET_IS_TYPING, payload: isTyping })
        },
        [dispatch]
    )

    const onSendFromUser = useCallback(
        (messages: IMessage[] = []) => {
            const createdAt = new Date()
            const messagesToUpload = messages.map(message => ({
                ...message,
                user,
                createdAt,
                _id: Math.round(Math.random() * 1000000),
            }))

            onSend(messagesToUpload)
        },
        [onSend]
    )

    const renderSystemMessage = useCallback(props => {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        )
    }, [])

    const renderSend = useCallback((props: SendProps<IMessage>) => {
        return (
            <Send {...props} containerStyle={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                <MaterialIcons size={30} color={'tomato'} name={'send'} />
            </Send>
        )
    }, [])

    const insets = useSafeAreaInsets()
    return (
        <SafeAreaView style={{ flex: 2, backgroundColor: '#f5f5f5', marginBottom: 0, }}>
            <ChatHeader />
            <View style={{ flex: 1, }}>
                <GiftedChat
                    messages={state.messages}
                    onSend={onSend}
                    loadEarlier={state.loadEarlier}
                    onLoadEarlier={onLoadEarlier}
                    isLoadingEarlier={state.isLoadingEarlier}
                    parsePatterns={parsePatterns}
                    user={user}
                    onPressAvatar={onPressAvatar}
                    onLongPressAvatar={onLongPressAvatar}
                    onLongPress={handleLongPress}
                    onQuickReply={onQuickReply}
                    quickReplyStyle={{ borderRadius: 2 }}
                    quickReplyTextStyle={{ fontWeight: '200' }}
                    renderQuickReplySend={renderQuickReplySend}
                    renderSystemMessage={renderSystemMessage}
                    renderSend={renderSend}
                    keyboardShouldPersistTaps="handled"
                    timeTextStyle={{
                        left: { color: 'red' },
                        right: { color: 'yellow' },
                    }}
                    isTyping={state.isTyping}
                    inverted={Platform.OS !== 'web'}
                    infiniteScroll
                    bottomOffset={insets.bottom}
                />
            </View>
        </SafeAreaView >
    )
}


