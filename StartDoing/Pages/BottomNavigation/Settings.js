import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

const Settings = () => {
  //navigation variable
  const navigation = useNavigation();

  //state variables
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState();

  //variable that will receive token decoded
  let decoded = '';

  //get token stored and set variables
  const getToken = async () => {
    try {
      setToken(await AsyncStorage.getItem('@token'));
      if (token !== null) {
        decoded = jwt_decode(token);
        setId(decoded.data.id);
        setName(decoded.data.name);
        setEmail(decoded.data.email);
        setPhotoUrl(decoded.data.photoUrl);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getToken();
  });

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <>
      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
          <View style={styles.profileImageBackground1}>
            <View style={styles.profileImageBackground2}>
              <Image
                style={styles.profileImage}
                source={{uri: photoUrl}}></Image>
            </View>
          </View>

          <Text style={styles.userName}>HI, {name}!</Text>

          <TouchableHighlight
            style={styles.planBtn}
            onPress={() =>
              navigation.navigate('EditDetails', {
                screen: 'EditDetails',
                params: {id: id, token: token},
              })
            }
            underlayColor="#F27A2999">
            <Text style={styles.planText}>EDIT WEIGHT & HEIGHT</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.planBtn}
            onPress={() => navigation.navigate('ChangeProfilePicture')}
            underlayColor="#F27A2999">
            <Text style={styles.planText}>CHANGE PROFILE PICTURE</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.planBtn}
            onPress={() =>
              navigation.navigate('ChangePassword', {
                screen: 'ChangePassword',
                params: {email: email},
              })
            }
            underlayColor="#F27A2999">
            <Text style={styles.planText}>CHANGE PASSWORD</Text>
          </TouchableHighlight>

          <View style={styles.logoutView}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Login')}>
              <View style={styles.logoutBtn}>
                <Text style={styles.logoutText}>LOGOUT</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#26282B',
  },
  bg2: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 72,
  },
  profileImageBackground1: {
    width: 84,
    height: 84,
    borderRadius: 50,
    backgroundColor: '#F27A29',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageBackground2: {
    width: 78,
    height: 78,
    borderRadius: 50,
    backgroundColor: '#26282B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  userName: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    marginTop: 6,
    alignSelf: 'center',
  },
  planBtn: {
    marginTop: 34,
    width: '85%',
    height: 90.9,
    borderRadius: 10,
    backgroundColor: '#F27A29',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  planText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
  logoutBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  logoutText: {
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  logoutView: {
    width: '85%',
  },
});

export default Settings;
