import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image
} from 'react-native';

import PatientDetails from '../data/PatientDetails.json';

class PatientList extends Component {
    constructor(props) {
        super(props)
        

    }
    calculateAge = (dob) => {
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    viewDetails = (data) => {
         this.props.navigation.navigate('PatientDetail', { PDetails: data })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.search_view}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,width:300,padding:10}}
                        placeholder={'Name'}
                        
                    />
                    <Image source={require('../assets/search.jpg')} style={{ width: 30, height: 30, borderRadius: 15, }} />
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,padding:10}}
                        placeholder={'DOB'}
                    />
                    <View style={{paddingTop:10, flexDirection:'row',justifyContent:'space-around'}} >
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1,padding:10,width:150 }}
                            placeholder={'Age'}
                        />
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1,padding:10,width:150 }}
                            placeholder={'Gender'}
                        />
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around',padding:10,}}>
                        <TouchableOpacity style={{borderWidth:3,width:100,height:35,borderColor:'#0083EF',borderRadius:15}}><Text style={{alignSelf:'center',paddingTop:5}}>clear search</Text></TouchableOpacity>
                        <TouchableOpacity style={{width:100,height:35,backgroundColor:'#0083EF',borderRadius:15,}} onPress={this.viewDetails()} ><Text style={{alignSelf:'center',color:'#FFF',paddingTop:5}}>search</Text></TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={PatientDetails.entry}
                    keyExtractor={(item, index) => item.id}
                    renderItem={(item, index) => (
                        
                        Object.keys(item.item).map((key, i) => (
                            <View key={i} style={{ borderWidth: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                {
                                    item.item.resource['name'].map((name, ind) => (
                                        <Text>{name.family}</Text>
                                    ))
                                }
                                <Text>{item.item.resource['gender']}</Text>
                                <Text>{this.calculateAge(item.item.resource['birthDate'])}</Text>
                                <TouchableOpacity  onPress={this.viewDetails(item.item)}>
                                    <Text>view</Text>
                                </TouchableOpacity>
                            </View>
                        ))

                    )
                    }
                />

            </View>
        )
    }
}

export default PatientList;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
            },
    search_view: {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingBottom:10,
        paddingTop:10
    },
    patient_list: {
        flexDirection: 'row',
        borderWidth: 1
    }
})