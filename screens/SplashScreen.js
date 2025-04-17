import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GlobeGif from '../assets/globe.gif';


export default function SplashScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.title}>TRUTHLENS</Text>
                <Text style={styles.tagline}>NEWS THAT DEMANDS ATTENTION</Text>
            </View>

            {/* placeholder for globe */}
            <View style={styles.middleSection}>
                <Image source={GlobeGif} style={styles.globe} />
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('News')}
                >
                    <Text style={styles.buttonText}>Enter the Headlines</Text>
                </TouchableOpacity>


            </View>

            <StatusBar style="light" />
        </View>

    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'space-between',
        paddingVertical: 60,
        paddingHorizontal: 24,
    },


    topSection: {
        alignItems: 'center',
        marginTop: 30,
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    title: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 10,
        textAlign: 'center',
    },
    tagline: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 40,
        textAlign: 'center',
    },
    middleSection: {
        alignItems: 'center',      // centers horizontally
        justifyContent: 'center',  // centers vertically (within its space)
        flex: 1,                   // takes up available space
    },

    globe: {
        width: 350,
        height: 350,
        resizeMode: 'contain',
        marginTop: -150,
    },

    button: {
        backgroundColor: '#2F2F2F', // deep red
        width: 240,             // give it enough space
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: -120
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },

});