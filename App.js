import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from "axios";
import { VictoryLine } from 'victory-native';

export default function App() {
	const [ data, setData ] = useState()
	const [ coin, setCoin ] = useState("bitcoin")
	const [ period, setPeriod ] = useState(30)

	useEffect(
		() => {
			getData()
		},
		[ coin, period ]
	)

	async function getData() {
		try {
			const response = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${period}`
			)
			const formatData = response.data.prices.map(function(i) {
				return {
					x: i[0],
					y: i[1]
				}
			})
			setData(formatData)
		} catch (error) {
			console.log(error)
		}
	}
  

  return (
    <View style={styles.container}>
			<Text style={styles.header}>CryptoChart</Text>
			<Image source={{uri: 'https://user-images.githubusercontent.com/60609786/200855727-22e055e7-ca4c-453c-b973-c7bdd1c56d57.png'}} style={styles.crypto} />
			<View style={styles.gap}/>
			<View style={styles.coins}>
				<View style={styles.Coinsec}>
					<Button title='Bitcoin' color="#D69C2F" style={[ styles.title, coin === "bitcoin" ? styles.underline : null ]}
						onPress={() => setCoin("bitcoin")}/>
					<Button title='Ethereum' color="#D69C2F" style={[ styles.title, coin === "ethereum" ? styles.underline : null ]}
						onPress={() => setCoin("ethereum")}/>
				</View>	
			<View style={styles.line}>
				<VictoryLine
					style={{
						data: {
							stroke: "#D69C2F",
							strokeWidth: 2
						}
					}}
					width={400}
					height={200}
					data={data}
				/>
			</View>
				{/*<Text
					style={[ styles.title, coin === "bitcoin" ? styles.underline : null ]}
					onPress={() => setCoin("bitcoin")}
				>
					Bitcoin
				</Text>
				<Text
					style={[ styles.title, coin === "ethereum" ? styles.underline : null ]}
					onPress={() => setCoin("ethereum")}
				>
					Ethereum
				</Text>*/}
			</View>
			{/*<VictoryLine
				style={{
					data: {
						stroke: "#D69C2F",
						strokeWidth: 2
					}
				}}
				width={400}
				height={200}
				data={data}
			/>*/}
			<View style={styles.gap}/>
			<View style={styles.timeWrapper}>
				<Button title="1 Day" color="#D69C2F" style={[ styles.time, period === 1 ? styles.underline : null ]} onPress={() => setPeriod(1)}/>
				<Button title="1 Weelk" color="#D69C2F" style={[ styles.time, period === 7 ? styles.underline : null ]} onPress={() => setPeriod(7)}/>
				<Button title="1 Month" color="#D69C2F" style={[ styles.time, period === 30 ? styles.underline : null ]} onPress={() => setPeriod(30)}/>
				<Button title="1 Year" color="#D69C2F" style={[ styles.time, period === 365 ? styles.underline : null ]} onPress={() => setPeriod(365)}/>
			</View>
		</View>
  )
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#121212"
	},
	space: {
		width:20
	},
	Coinsec: {
		width: '100%',
		marginTop:100,
		flexDirection:"row",
		justifyContent:'space-around',
		alignItems:"center"
	},
	gap:{
		margin:20,
		height: 20
	},
	crypto: {
		position:"absolute",
		top:128,
		width: 150,
		height: 150
	},
	title: {
		color:"#fff",
		fontSize: 20,
		fontWeight: "bold",
		margin: 10
	},
	timeWrapper: {
		marginTop:40,
		width:'100%',
		position: "absolute",
		bottom: 150,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: 'space-around'
	},
	coins: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	line:{
		marginTop:50
	},
	time: {
		color:"#fff",
		margin: 60
	},
	header: {
		//borderstyle : "1px solid white", 
		color:"#D69C2F",
		position: "absolute",
		top: 50,
		fontSize: 30,
		fontWeight: "bold"
	},
	underline: { textDecorationLine: "underline" }
});
