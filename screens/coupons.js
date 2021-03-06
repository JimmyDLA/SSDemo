import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View, TabNavigator, Icon, FlatList } from 'react-native';
import {List, ListItem, SearchBar} from 'react-native-elements';


// import Coupons from './screens/coupons';
// import Login from './screens/login';
// import NativeAPI from './screens/nativeApi';

class Coupons extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			allCoupons: {},
			loading: false
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

  render() {
    return (
			<List style={styles.list} containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}>
				<FlatList
					data={this.state.allCoupons}
					keyExtractor={item => item.coupon.coupon_id}
					ItemSeparatorComponent={this.renderSeparator}
					// ListHeaderComponent={this.renderHeader}
					// ListFooterComponent={this.renderFooter}
					renderItem={({ item }) => (
						<ListItem
							roundAvatar
							title={item.coupon.title}
							subtitle={item.coupon.details}
							avatar={item.coupon.brand_image_url}
							containerStyle={{borderBottomWidth: 0}}
							onPress={()=> this.onMoreDetails(item)}
						/>
					)}
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
