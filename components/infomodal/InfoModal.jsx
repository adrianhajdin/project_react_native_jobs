import React from 'react';

const InfoModal = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{
            width: "85%",
            backgroundColor: COLORS.secondary,  // <-- set background color
            padding: 40,
            borderRadius: 10,
            // Add shadow style for iOS
            shadowColor: '#000',
            shadowOffset: {
            width: 0,
            height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            // Add shadow style for Android
            elevation: 5,
        }}>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                }}
                onPress={() => setModalVisible(false)}
            >   
                <AntDesign name="close" size={24} color={COLORS.lightWhite} />
            </TouchableOpacity>

            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{ color: COLORS.lightWhite, fontSize: 30 }}>What we mean by 'AI Tools'</Text>
            </View>

            <ScrollView style={{height: 400}}>
                <Text style={{ color: COLORS.tertiary, fontSize: 20, marginTop: 20 }}>How it works</Text>

                <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>
                    Our present pipline is to give Chat-GPT 4 model the role of an experienced book reviewer and ask to rate all of the books based on each of the topics. Then we take the cosine similarity between ChatGPT's answer and each user's individual prefences (in the form of two vectors). Finally we map the data to a percentage that represents how close the book is to the user. If you don't understnad this that is fine, we would like to include it for the people who are curious!
                </Text>
                
                <Text style={{ color: COLORS.tertiary, fontSize: 20, marginTop: 10 }}>What this means</Text>

                <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>
                    Currently, we do not have enough customer data to create a reliable neural network or machine learning model. Our algorithm is no better than just asking ChatGPT what books you should read! We know this is not ideal for what you might have envisioned about our app, but we wish to expand our model in the future, to  take information from real sources like active users and scraping data from Reddit. 
                </Text>

                <Text style={{ color: COLORS.tertiary, fontSize: 20, marginTop: 20 }}>What can I do?</Text>

                <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>
                    Getting more active users is probably the best way we can improve our algoritm. Help us do so by spreading awareness, and we can bring knowlegde/learning to communites around us together!
                </Text>


                <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>If you would like to know more, you can look at our GitHub repo   <Text style={{ color: COLORS.tertiary, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://github.com/omrajpal/read_ai')}>here</Text>.
                </Text>

                <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>If you would like to see how we use your data, you can view our privacy policy <Text style={{ color: COLORS.tertiary, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.termsfeed.com/live/9b007a78-2d35-4e2d-bf53-d8dd2c5af8d3')}>here</Text>.
                </Text>
            </ScrollView>
            </View>
    </View>
  )
}

export default InfoModal;