import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';

class PatientDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PDetails: props.route.params.PDetails,

        }

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

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/person.jpg')} style={{ width: 90, height: 90, borderRadius: 45 }} />
                <View style={{ flexDirection: 'column' }}>
                    {
                        Object.keys(this.state.PDetails).map((key, i) => (
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Family Name : </Text>
                                    {
                                        this.state.PDetails.resource['name'].map((name, ind) => (
                                            <Text>{name.family}</Text>
                                        ))
                                    }

                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Given Name : </Text>
                                    {
                                        this.state.PDetails.resource['name'].map((name, ind) => (
                                            <Text>{name.given.join(" ")}</Text>
                                        ))
                                    }
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Gender : </Text>
                                    <Text>{this.state.PDetails.resource['gender']}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Birth Date : </Text>
                                    <Text>{this.state.PDetails.resource['birthDate']}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Age : </Text>
                                    <Text>{this.calculateAge(this.state.PDetails.resource['birthDate'])}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Birth Sex : </Text>
                                    <Text>{this.state.PDetails.resource['gender']}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Phone No : </Text>
                                    {
                                        this.state.PDetails.resource['telecom'].map((name, ind) => (
                                            <Text>{name.value}</Text>
                                        ))
                                    }
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text>City : </Text>
                                    {
                                        this.state.PDetails.resource['address'].map((name, ind) => (
                                            <Text>{name.city}</Text>
                                        ))
                                    }
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>State : </Text>
                                    {
                                        this.state.PDetails.resource['address'].map((name, ind) => (
                                            <Text>{name.state}</Text>
                                        ))
                                    }
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Postal Code : </Text>
                                    {
                                        this.state.PDetails.resource['address'].map((name, ind) => (
                                            <Text>{name.postalCode}</Text>
                                        ))
                                    }
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Country : </Text>
                                    {
                                        this.state.PDetails.resource['address'].map((name, ind) => (
                                            <Text>{name.country}</Text>
                                        ))
                                    }
                                </View>

                                {
                                    (key == 'link') ?
                                        <View>
                                            <Text>Linked Patients</Text>
                                            <Text>Patient ID :{this.state.PDetails.resource['id']}</Text>
                                        </View> : null
                                }

                            </View>
                        ))
                    }





                </View>
            </View>
        )
    }
}

export default PatientDetail;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})