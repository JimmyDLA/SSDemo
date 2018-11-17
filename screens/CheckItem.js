
import React from 'react';
import { StyleSheet, Text, View, Icon, FlatList, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';



class CheckItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            lists: [
                {
                    coupon: {
                        title: "1"
                    }
                }
            ]
        };
    }
    check() {
        this.setState({ checked: !this.state.checked });
        console.log("checkitem:" + !this.state.checked)
    }

    render() {
        return (
            <CheckBox
                title={this.props.title}
                onPress={() => this.check()}
                containerStyle={{ borderBottomWidth: 0 }}
                checked={this.state.checked}
            />
        );
    }
}

export default CheckItem;
