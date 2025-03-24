import React from 'react'
import { Linking, Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export function ChatHeader() {
    return (
        <>

            <View style={styles.header}>
                <MaterialIcons name="arrow-back" size={24} color="black" style={styles.iconLeft} />
                <Text style={styles.title}>Mia</Text>
                <MaterialIcons name="more-vert" size={24} color="black" style={styles.iconRight} />
            </View>

            <View style={styles.navContainer}>
                <View style={styles.navItem}>
                    <Text style={styles.navText} onPress={() => Linking.openURL('http://example.com/chat')}>
                        Chat
                    </Text>
                </View>
                <View style={styles.navItem}>
                    <Text style={styles.navText} onPress={() => Linking.openURL('http://example.com/chat')}>
                        Profile
                    </Text>
                </View>
            </View>

        </>
    )
}


const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconLeft: {
        marginLeft: 10,
    },
    title: {
        flex: 1,
        textAlign: 'center',
    },
    iconRight: {
        marginRight: 10,
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        textAlign: 'center',
        color: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
});