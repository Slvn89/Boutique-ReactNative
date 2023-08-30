import React, { useState, useContext } from 'react';
import { View,Text } from 'react-native';
import { Button, Menu, Divider, PaperProvider, IconButton, Colors } from 'react-native-paper';
import { MenuContext } from '../../MenuContext';
import { fonctDisplayPanier } from '../../Panier/Panier';


const NavMenu = (props) => {
    const menuContext = useContext(MenuContext)

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
  

    const logo = () => (
        <View>
       
        <Button
            icon="basket"
            
            size={20}
            
            />

            </View>
    );

    return (
        <PaperProvider>
            <View
                style={{
                    paddingTop: 50,
                    flexDirection: 'row',
                    height: 220,
                }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show menu</Button>}>
                    <Menu.Item onPress={() => { }} title="Articles" />
                    <Menu.Item onPress={(e)=>{
            e.preventDefault();
            props.text === "Panier" ?
                menuContext.fonctDisplayPanier(menuContext.displayPanier)
                 :
                <></>

        }} title="Panier" />
                    <Divider />
                    <Menu.Item onPress={() => { }} title="Item 3" />
                </Menu>
                {logo()}
            </View>
        </PaperProvider>
    );
};

export default NavMenu;
