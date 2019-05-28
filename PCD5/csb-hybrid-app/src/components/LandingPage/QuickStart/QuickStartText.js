import React from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';

const QuickStartText = () => {
    return (<View style={style.paragraphContainer}>

            <View style={style.header}>
                <Image style={style.icon} source={require('../../../assets/global/images/csb_info.png')}/>
                <Text style={style.title}>What is a CSB?</Text>
            </View>
            <View style={style.paragraph}>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et velit massa. Sed tempor, urna vitae
                    dignissim consequat, eros velit auctor lectus, sit amet venenatis justo lorem sed ligula. Curabitur
                    efficitur libero vel molestie faucibus. Ut congue libero vel purus rutrum, et posuere felis
                    hendrerit. Sed hendrerit, est sit amet ultricies tempor, felis augue gravida justo, sed hendrerit
                    orci nunc sit amet leo. Nam interdum, leo sit amet consectetur rhoncus, leo nunc euismod mauris,
                    eget iaculis mi eros a purus. Nam luctus interdum ex nec pharetra. Maecenas egestas mi vitae
                    elementum iaculis. Donec egestas mi ac tincidunt placerat. Aliquam purus augue, volutpat sit amet
                    efficitur vitae, consectetur in ipsum. Duis euismod, tellus eu ornare rhoncus, ante leo euismod
                    lacus, eget laoreet diam est a lectus. Phasellus sit amet sem porta, posuere erat sit amet,
                    malesuada nunc. Curabitur elementum neque vel dapibus cursus. Nulla cursus sodales erat.</Text>
            </View>
            <View style={style.paragraph}>
                <Text>Cras rhoncus hendrerit enim, pulvinar luctus elit pellentesque eu. Praesent euismod convallis
                    consectetur. Duis eget faucibus magna. Quisque neque justo, facilisis eu dolor in, porttitor commodo
                    purus. Aliquam rhoncus ipsum et odio molestie, sit amet posuere tortor semper. Integer vel nunc non
                    augue ullamcorper sollicitudin. Aenean dignissim felis malesuada tristique elementum. Maecenas
                    tincidunt pharetra rhoncus. Vestibulum vitae lorem egestas, tincidunt orci et, malesuada purus.
                    Pellentesque vitae libero pellentesque, auctor eros a, pellentesque urna. Nullam euismod sed dui ut
                    rhoncus. Maecenas fringilla est sit amet turpis interdum, quis suscipit dolor suscipit.</Text>
            </View>

            <View style={style.paragraph}>
                <Text>Ut nibh magna, ullamcorper at pulvinar sit amet, faucibus et risus. Pellentesque vitae dolor
                    mollis, sagittis nulla ut, pretium elit. In hac habitasse platea dictumst. Praesent condimentum,
                    quam ut mattis rutrum, nisi magna ultrices eros, cursus finibus ante neque ut metus. Nunc felis
                    erat, faucibus non ante vitae, laoreet faucibus dui. Suspendisse at vulputate velit. Mauris sagittis
                    lobortis pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos himenaeos. Donec cursus et sapien et accumsan. Vestibulum a ullamcorper quam. Pellentesque
                    facilisis aliquam mauris quis dignissim. Ut dui nisl, ultricies non pellentesque accumsan, tincidunt
                    lacinia leo.</Text>
            </View>

            <View style={style.paragraph}>
                <Text>Aliquam vitae sem in nisl condimentum imperdiet. Praesent turpis velit, feugiat et odio
                    pellentesque, molestie cursus felis. Quisque eleifend odio eu sapien rutrum finibus. Maecenas
                    hendrerit tempor ligula, eu aliquet felis laoreet id. Cras viverra metus posuere lorem pulvinar,
                    quis pretium neque fermentum. Pellentesque et ipsum vitae lacus commodo ultrices a et metus.
                    Maecenas sollicitudin dolor est, in porttitor diam lacinia eget.</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    header:{
        flexDirection: "row"
    },
    title:{
      lineHeight:64,
      fontSize:20,
      fontWeight: "bold",
      color:"#444",
      marginLeft: 16
    },
    icon:{
      width:64,
      height:64
    },
    paragraphContainer: {
        width: "100%",
        height: "100%",
    },
    paragraph: {
        width: "100%",
        marginTop: 20
    }
});

export default QuickStartText;