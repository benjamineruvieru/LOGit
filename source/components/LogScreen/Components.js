import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../../constants/Colors';
import dateFormat from 'dateformat';
import {SCREEN_WIDTH} from '../../constants/Variables';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {IconButton, NormalText, ButtonView} from '../Components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {createThumbnail} from 'react-native-create-thumbnail';

export const FlatListBody = props => {
  let height, text;

  const SaveLog = () => {
    if (text) {
      props.updateLog({
        message: text,
        id: props.data.item.id,
        date: props.data.item.date,
      });
      text = null;
    }
  };
  const [uri, setUri] = useState([]);
  useEffect(() => {
    console.log(uri);
  }, [uri]);
  const logview_dime = layout => {
    height = layout.height;
  };

  const LogView = props => {
    return (
      <View
        onLayout={event => {
          logview_dime(event.nativeEvent.layout);
        }}
        style={styles.logviewStyle}>
        {props.children}
      </View>
    );
  };

  const LogHead = props => {
    if (props.time === null) {
      return (
        <View style={{padding: 6}}>
          <Text style={styles.logheadtextStyle}>Loading...</Text>
        </View>
      );
    }
    var dTemp = new Date(props.time);
    var date = dateFormat(dTemp, 'h:MM:ss TT - ddd mmmm dS yyyy');
    return (
      <View style={{padding: 6}}>
        <Text style={styles.logheadtextStyle}>{date}</Text>
      </View>
    );
  };

  const LogText = props => {
    return <Text style={styles.logtextStyle}>{props.children}</Text>;
  };

  const GetImg = async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      includeExtra: true,
      saveToPhotos: true,
    });
    console.log(result);
    if (result.assets[0].type.includes('video')) {
      createThumbnail({
        url: result.assets[0].uri,
        timeStamp: 10000,
      })
        .then(response => {
          console.log(response);
          const tmp = [...uri];
          tmp.push({
            path: response.path,
            height: response.height,
            width: response.width,
            type: 'video',
          });
          setUri(tmp);
        })
        .catch(err => console.log({err}));
      return;
    }
    const tmp = [...uri];
    tmp.push({
      path: result.assets[0].uri,
      height: result.assets[0].height,
      width: result.assets[0].width,
      type: 'picture',
    });
    setUri(tmp);
  };

  const LogAddMedia = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconButton type={'save'} function={SaveLog} />
        <IconButton type={'camera'} />
        <IconButton type={'image'} function={GetImg} />
        <IconButton type={'video'} />
        <View style={{flex: 1}}></View>
        <IconButton type={'delete'} function={() => console.log('deleted')} />
      </View>
    );
  };

  const LogImages = props => {
    console.log(props);
    return (
      <View
        style={{
          height: props.item.height / 10,
          width: props.item.width / 10,
          marginBottom: 6,
          marginLeft: 6,
          maxHeight: 80,
          maxWidth: 80,
        }}>
        <Image
          source={{uri: props.item.path}}
          resizeMode={'contain'}
          style={{
            height: props.item.height / 10,
            width: props.item.width / 10,
            maxHeight: 80,
            maxWidth: 80,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 1,
            height: 16,
            width: 16,
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 16,
              width: 16,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 5,
            }}></View>
          <IconButton
            type={'cancel'}
            function={() => console.log('remove image')}
          />
        </View>
      </View>
    );
  };

  const LogVideos = props => {
    console.log(props);
    return (
      <View
        style={{
          height: props.item.height / 10,
          width: props.item.width / 10,
          marginBottom: 6,
          marginLeft: 6,
        }}>
        <Image
          source={{uri: props.item.path}}
          resizeMode={'contain'}
          style={{
            height: props.item.height / 10,
            width: props.item.width / 10,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 1,
            height: 16,
            width: 16,
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 16,
              width: 16,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 5,
            }}></View>
          <IconButton
            type={'cancel'}
            function={() => console.log('remove image')}
          />
        </View>
      </View>
    );
  };

  const LogPick = props => {
    if (props.item.type.includes('video')) {
      console.log('vid');
      return <LogVideos item={props.item} />;
    }
    console.log('pic');
    return <LogImages item={props.item} />;
  };
  const LogFlatImages = () => {
    return (
      <FlatList
        data={uri}
        renderItem={LogPick}
        horizontal
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      />
    );
  };

  const LogBody = props => {
    return (
      <>
        {props.isEditting ? (
          <LogView>
            <LogEdit message={props.message} />
            <LogFlatImages />
            <LogAddMedia />
          </LogView>
        ) : (
          <View>
            <Swipeable
              renderRightActions={rightSwipeActions}
              onSwipeableRightOpen={swipeFromRightOpen}>
              <LogView>
                <LogText>{props.message}</LogText>
              </LogView>
            </Swipeable>
          </View>
        )}
      </>
    );
  };

  const LogVerticalBar = ({index, length}) => {
    //console.log(index, length);
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            ...styles.LogVerticalTopBarStyle,
            backgroundColor: index === 0 ? 'transparent' : Colors.logbag,
          }}></View>
        <View style={styles.logdotStyle}></View>
        <View
          style={{
            ...styles.LogVerticalBarStyle,
            backgroundColor:
              index + 1 === length ? 'transparent' : Colors.logbag,
          }}></View>
      </View>
    );
  };

  const LogEdit = () => {
    const inputRef = useRef(null);
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {},
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          // console.log(props.all);

          inputRef.current.blur();
        },
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);
    return (
      <TextInput
        ref={inputRef}
        style={styles.textinputStyle}
        onChangeText={m => (text = m)}
        multiline={true}
        placeholder="Enter Log..."
        placeholderTextColor={Colors.bluegrey}
      />
    );
  };

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'flex-end',
          borderRadius: 10,
          height: height,
          left: 5,
        }}>
        <Text
          style={{
            color: Colors.white,
            paddingHorizontal: 10,
            fontWeight: '600',
            //   paddingHorizontal: 30,
            //   paddingVertical: 20,
            fontFamily: 'Gilmer Medium',
            fontSize: 12,
          }}>
          Delete
        </Text>
      </View>
    );
  };

  const swipeFromRightOpen = () => {
    console.log('Swipe from right');
  };

  return (
    <View style={styles.flatlistviewStyle}>
      <LogVerticalBar index={props.data.index} length={props.length} />
      <View>
        <LogHead time={props.data.item.date} />

        <LogBody
          message={props.data.item.message}
          isEditting={props.data.item.isEditting}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  logtextStyle: {color: Colors.grey, fontFamily: 'ComingSoon-Regular'},
  logviewStyle: {
    backgroundColor: Colors.logbag,
    borderRadius: 10,
    padding: 8,
    marginBottom: 32,
    maxWidth: SCREEN_WIDTH - 42,
  },
  LogVerticalBarStyle: {
    width: 2,
    height: '100%',
  },
  LogVerticalTopBarStyle: {
    width: 2,
    height: 10,
  },
  flatlistviewStyle: {flexDirection: 'row', flex: 1},
  logdotStyle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  logheadtextStyle: {
    color: Colors.grey,
    fontFamily: 'Gilmer Medium',
    fontSize: 12,
  },
  textinputStyle: {
    color: Colors.grey,
    fontFamily: 'ComingSoon-Regular',
    maxHeight: 200,
    height: 150,
    borderRadius: 10,
    width: SCREEN_WIDTH - 58,
    textAlignVertical: 'top',
  },
});
