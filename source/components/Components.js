import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Icon, {Icons} from './Icons';

export const BackView = props => {
  return <View style={styles.backviewStyle}>{props.children}</View>;
};

export const HeaderText = props => {
  return <Text style={styles.headertextStyle}>{props.children}</Text>;
};

export const NormalText = props => {
  return <Text style={styles.normaltextStyle}>{props.children}</Text>;
};

export const Tab = props => {
  return (
    <View style={{...props.style, ...styles.tabStyle}}>{props.children}</View>
  );
};

export const ButtonView = props => {
  return (
    <TouchableOpacity
      style={{...styles.buttonStyle, ...props.style}}
      onPress={props.function}>
      {props.children}
    </TouchableOpacity>
  );
};

export const TextButton = props => {
  return (
    <ButtonView
      style={{alignSelf: 'center', padding: 3}}
      function={props.function}>
      <Text style={styles.textbuttonStyle}> {props.children}</Text>
    </ButtonView>
  );
};

export const IconButton = props => {
  if (props.type === 'search') {
    return (
      <ButtonView style={{marginRight: 30}} function={props.function}>
        <Icon type={Icons.Ionicons} name={'search'} color={Colors.white} />
      </ButtonView>
    );
  }
  if (props.type === 'settings') {
    return (
      <ButtonView function={props.function}>
        <Icon type={Icons.Feather} name={'settings'} color={Colors.white} />
      </ButtonView>
    );
  }
  if (props.type === 'image') {
    return (
      <ButtonView style={{paddingVertical: 0}} function={props.function}>
        <Icon
          type={Icons.MaterialIcons}
          name={'image'}
          color={Colors.bluegrey}
          size={22}
        />
      </ButtonView>
    );
  }
  if (props.type === 'video') {
    return (
      <ButtonView style={{paddingVertical: 0}} function={props.function}>
        <Icon
          type={Icons.Feather}
          name={'video'}
          color={Colors.bluegrey}
          size={22}
        />
      </ButtonView>
    );
  }
  if (props.type === 'delete') {
    return (
      <ButtonView style={{paddingVertical: 0}} function={props.function}>
        <Icon
          type={Icons.MaterialCommunityIcons}
          name={'delete'}
          color={Colors.bluegrey}
          size={22}
        />
      </ButtonView>
    );
  }
  if (props.type === 'camera') {
    return (
      <ButtonView style={{paddingVertical: 0}} function={props.function}>
        <Icon
          type={Icons.MaterialCommunityIcons}
          name={'camera'}
          color={Colors.bluegrey}
          size={22}
        />
      </ButtonView>
    );
  }
  if (props.type === 'cancel') {
    return (
      <ButtonView style={{padding: 0}} function={props.function}>
        <Icon
          type={Icons.AntDesign}
          name={'close'}
          color={Colors.white}
          size={13}
        />
      </ButtonView>
    );
  }
  if (props.type === 'save') {
    return (
      <ButtonView
        style={{
          backgroundColor: Colors.primary,
          borderRadius: 25,
          marginRight: 10,
        }}
        function={props.function}>
        <Icon
          type={Icons.Entypo}
          name={'check'}
          color={Colors.white}
          size={15}
        />
      </ButtonView>
    );
  }
};

const styles = StyleSheet.create({
  backviewStyle: {backgroundColor: Colors.bagDark, flex: 1, padding: 16},

  headertextStyle: {
    fontSize: 30,
    color: Colors.grey,
    fontFamily: 'Gilmer Heavy',
  },

  normaltextStyle: {
    fontSize: 17,
    color: Colors.grey,
    fontFamily: 'Gilmer Medium',
  },

  tabStyle: {
    paddingVertical: 13,
    flexDirection: 'row',
    width: '100%',
  },

  buttonStyle: {
    padding: 8,
  },

  textbuttonStyle: {
    color: Colors.grey,
    fontFamily: 'Gilmer Regular',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
