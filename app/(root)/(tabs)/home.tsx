import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

const Home = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>Home</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
})

export default Home;