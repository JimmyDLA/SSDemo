import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import {List, ListItem} from 'react-native-elements';


// import Coupons from './screens/coupons';
// import Login from './screens/login';
// import NativeAPI from './screens/nativeApi';

class CouponDetail extends React.Component {
	constructor(props) {
    super(props);
    this.state = {

    };
  }

	componentDidMount(){
		console.log('coupon: ' + JSON.stringify(this.props.navigation.state.params.item.coupon));
	}

	onBack = () => {
		this.props.navigation.goBack();
	}

  render() {
		const {reward_type, coupon_id, title, details, marketing_message, product_image_url, brand_name, purchase_value, reward_value} = this.props.navigation.state.params.item.coupon
		var brand =  brand_name.replace('Brand', '');
		var money = (reward_type == "fixed" ? "$" : "");
		var percent = (reward_type == "percentage" ? "%" : "");
		var value = (reward_type == "fixed" ? reward_value.toFixed(2) : reward_value)

		return (
      <View style={styles.container}>

				<View style={styles.headerCont}>
					<ImageBackground style={styles.header} source={require('../images/demo-background.png')}>
						<TouchableHighlight style={styles.arrowCont} onPress={this.onBack}>
							<Image style={styles.arrow} source={require('../images/arrow_back.png')} onPress={()=> this.onBack()} source={require('../images/arrow_back.png')}
							/>
						</TouchableHighlight>
						<Text style={styles.headerTitle}>{brand}</Text>
					</ImageBackground>
					<View style={styles.imageCont}>
						<Image style={styles.prodImage} source={{uri: product_image_url}}
						/>
					</View>
				</View>

				<View style={styles.infoCont}>
					<Text style={styles.title}>{title} </Text>
					<Text style={styles.details}>{details} </Text>
					<Text style={styles.reward}> Save {money}{value}{percent}</Text>
				</View>

				<TouchableOpacity
				style={ styles.button }>
					<ImageBackground
					source={require('../images/demo-background.png')}
					style={styles.img}>
						<Text style={ styles.txtButton } >
							Activate
						</Text>
					</ImageBackground>
				</TouchableOpacity>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,240,240)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
	nav: {
		height:"100%",
		width: "100%",
		backgroundColor: 'pink'
		// alignItems: 'flex-end'
	},
	arrowCont:{
		position: 'absolute',
		top: 50,
		left: 10,
	},
	arrow: {
		height: 30,
		width: 30
	},
	headerCont: {
		width: '100%',
		height: "50%",
		shadowColor: "rgba(120,120,120,0.5)" ,
		shadowOffset: {
			height:5,
			width:0,
			zIndex: 1
		},
		shadowOpacity: 1,
		shadowRadius: 5,
		// justifyContent: 'flex-end'
	},
	header: {
		width: "100%",
		height: 100,
		justifyContent: 'flex-end',
		alignItems: 'center',
		shadowColor: "rgba(120,120,120,0.5)" ,
		shadowOffset: {
			height:5,
			width:0,
			zIndex: 1
		},
		shadowOpacity: 1,
		shadowRadius: 5,
	},
	headerTitle: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
		padding: 15
	},
	imageCont: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 250,
		backgroundColor: 'white'
	},
	prodImage: {
		width:175,
		height: 175
	},
	infoCont: {
		width: "95%",
		height: 170,
		backgroundColor: 'white',
		shadowColor: "rgba(120,120,120,0.5)" ,
		shadowOffset: {
			height:5,
			width:0,
			zIndex: 1
		},
		shadowOpacity: 1,
		shadowRadius: 5,
		marginTop: 20,
	},
	title: {
		color: "#6aa8e4",
		fontSize: 27,
		position: "absolute",
		top: 10,
		paddingLeft: 20,
		paddingRight: 20
	},
	reward: {
		color: "#6aa8e4",
		fontSize: 25,
		position: "absolute",
		bottom: 30,
		right: 20
	},
	details: {
		width:"55%",
		color: "rgb(150,150,150)",
		fontSize: 15,
		position: "absolute",
		bottom: 30,
		paddingLeft: 20
	},
	button: {
		height: 80,
		width: "100%",
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		padding: 10,
		shadowColor: "rgba(0,0,0,0.1)" ,
		shadowOffset: {
			height:4,
			width:0
		},
		shadowOpacity: 1,
		shadowRadius: 1,
	},
	txtButton: {
		color:'white',
		fontSize: 30
	},
	img: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
		width:"100%",
	},
});

export default CouponDetail;
