import React from 'react';
import { StyleSheet, TextInput, ActivityIndicator, Text, View, TabNavigator, FlatList, TouchableOpacity } from 'react-native';
import {List, Icon, SearchBar, CheckBox} from 'react-native-elements';
import CheckItem from './CheckItem';


// import Coupons from './screens/coupons';
// import Login from './screens/login';
// import NativeAPI from './screens/nativeApi';

class Coupons extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        allCoupons: {},
        loading: false,
        checked: true,
        text: '',
        inputing: false,
        lists:[
            
        ]
    };
  }

	//FUNCTIONS!
	componentDidMount(){
		//function to make API call
		console.log("componentDidMount");
		this.getCoupons();
		this.setState({
			loading: true
		})
    }
    check(){
        this.setState({ checked: !this.state.checked });
        console.log("!checked:" + !this.state.checked )
    }

    createNewTodo(){
        if(!this.state.inputing){
            this.setState({inputing:!this.state.inputing})
        } else {
            this.blurInput()
        }
    }

	onMoreDetails(item){
		this.props.navigation.navigate('CouponDetail', {item})
	}

	getCoupons(){
		console.log('GET ALL Coupons!');
		fetch('http://api10.qa2.savewave.com/coupons.json', {
			method: 'GET',
			headers: {
				'Authorization': 'OAuth: 6f64c2abe2414f929c0fe7d06e31c3472fcde0f74714406b82e17ce1032f709c',
			}
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log('resp: ' + JSON.stringify(responseJson))
			this.setState({
				allCoupons: responseJson,
				loading: false
			})
		})
		// .catch((error) => {
		// 	console.error('400 or something '+ error);
		// });
	}

	renderHeader = () => {
		return(
			<SearchBar
				placeholder= "type here..."
				lightTheme round
			/>
		);
	}

	renderFooter = () => {
		return(
			<View style={{
				paddingVertical: 20,
				borderTopWidth: 1,
				borderTopColor: "black"
				}}
			>
				<ActivityIndicator animating size="large"/>
			</View>
		);
	}

	renderSeparator = () => {
		return(
			<View
				style={{
					height: 1,
					width: "86%",
					backgroundColor: 'rgb(9, 132, 227)',
					marginLeft: "15%"
				}}
			/>
		);
    }


    blurInput = () =>{
        var arr=[];
        //1.log
        console.log("text: " + this.state.text)
        arr.push({name: this.state.text})
        

        //2. make POST call of this.state.text
        //temp push into an array
        this.setState({lists: arr })

        //3. remove input & clear text
        this.setState({inputing: false})
        this.setState({text: ''})
    }
    
    ifInput = () =>{
        if (this.state.inputing) {
            return (
                <List style={styles.list} containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 3, padding: 5, margin: 10 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        onBlur={this.blurInput}
                    />
                </List>
            );
        }
    }

  render() {
    return (
        <List style={styles.list} containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}>
            <FlatList
                data={this.state.lists}
                // keyExtractor={item => item.coupon.coupon_id}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }) => (
                    <CheckItem
                        title={item.name}
                    />
                )}
            />
            
            {this.ifInput()}

            <Icon
                name='plus'
                type='evilicon'
                color='#517fa4'
                size={50}
                onPress={()=> this.createNewTodo()}
            />             
        </List>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Coupons;
