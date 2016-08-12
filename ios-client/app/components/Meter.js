import React from 'react';
import {Text, View} from 'react-native';
import StyleSheet from './StyleSheet';

const BORDER_WIDTH = 2.5;
const BORDER_OFFSET = BORDER_WIDTH * 2;
const styles = StyleSheet.create({
  meter: {
    borderRadius: 6,
    borderWidth: BORDER_WIDTH,
    borderColor: '$clear',
    backgroundColor: '$grayBackground',
    height: 25,
    margin: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  meterProgress: {
    height: 20,
    borderRadius: 4,
    borderWidth: BORDER_WIDTH,
    borderColor: '$clear',
    backgroundColor: '$blue',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressPercent: {
    textAlign: 'center',
    color: '$white',
    justifyContent: 'center',
  },
  red: {
    backgroundColor: '$red',
  },
})

percentOfWidthInPoints = (widthPoint, percentage) => {
  return widthPoint * (Math.min(100, percentage) / 100);
}

normalizedProgressWidth = (points) => {
  return Math.max(0, points-BORDER_OFFSET);
}

Meter = (props) => {
  const points = percentOfWidthInPoints(props.width, props.percent);
  const width  = normalizedProgressWidth(points);

  return (
    <View style={[styles.meter, {width: props.width}]}>
      <View style={[styles.meterProgress, {width}, styles[props.color]]}>
        <Text style={styles.progressPercent}>{ (width > 34) ? `${props.percent}%` : ''}</Text>
      </View>
    </View>
  )
}

module.exports = Meter;
