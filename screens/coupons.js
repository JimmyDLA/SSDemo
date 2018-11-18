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
        this.blurInput()
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
        if (this.state.text == "") {
            return
        } else{
            var ID = function () {
                return '' + Math.random().toString(36).substr(2, 9);
            }
            //1.log
            console.log("text: " + this.state.text)
            var newelement = {
                name: this.state.text,
                id: ID()
            }
            
            //2. make POST call of this.state.text
            //temp push into an array
            this.setState({ lists: [...this.state.lists, newelement] });
    
            //3. remove input & clear text
            this.setState({inputing: false})
            this.setState({text: ''})

        }
    }

    updateList = (id) => {
        //1. loop thru List and find exact match
        for (let j = 0; j < this.state.lists.length; j++) {
            const element = this.state.lists[j].id;
            //2. once found, delete it!
            if (id == element) {
                console.log("found match! -> " + element)
                newList = this.state.lists;
                newList.splice(j, 1);
                this.setState({lists: newList});
                console.log("new list " + JSON.stringify(newList));
                console.log("state list " + this.state.lists)
                return
            }
        }
    }

  render() {
    return (
        <List style={styles.list} containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}>
            <FlatList
                data={this.state.lists}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }) => (
                    <CheckItem
                        title={item.name}
                        id={item.id}
                        updateList={this.updateList}
                    />
                )}
            />
            
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 3, padding: 5, margin: 10 }}
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
                onBlur={this.blurInput}
                placeholder='Enter New Task...'
            />

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
