import React from 'react'
import { Linking, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export function ChatHeader() {
    return (
        <>
            <View style={{ marginTop: 20, margin: 10, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="arrow-back" size={24} color="black" style={{ marginLeft: 10 }} />
                <Text style={{ flex: 1, textAlign: 'center' }}>Mia</Text>
                <MaterialIcons name="more-vert" size={24} color="black" style={{ marginRight: 10 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                        style={{ textAlign: 'center', color: 'black', borderBottomWidth: 2, borderBottomColor: 'black' }}
                        onPress={() => Linking.openURL('http://example.com/chat')}
                    >
                        Chat
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                        style={{ textAlign: 'center', color: 'black', borderBottomWidth: 2, borderBottomColor: 'black' }}
                        onPress={() => Linking.openURL('http://example.com/chat')}
                    >
                        Profile
                    </Text>
                </View>
            </View>
        </>
    )
}