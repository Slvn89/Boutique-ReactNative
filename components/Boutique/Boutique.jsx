import CardArticle from "../Card/Card";
import { React } from "react";
import { View, StyleSheet } from 'react-native';



function Boutique(props) {


    return (
        <View>
            {
                props.articles.map((value, index) => {

                    return (
                        <CardArticle
                            article={value}
                            key={index}
                        ></CardArticle>
                    )
                })
            }
        </View>
    )
}

export default Boutique;