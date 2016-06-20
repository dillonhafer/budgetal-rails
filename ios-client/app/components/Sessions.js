import React, {Component} from 'react'
import {
  Dimensions,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
const SwipeableListViewDataSource = require('SwipeableListViewDataSource');
import SwipeableListView from 'SwipeableListView';

import {capitalize} from 'lodash-node'
import {humanUA,sessionDate} from '../utils/ViewHelpers'
import {confirm}   from '../utils/window';
import {allSessions,signOut} from '../data/sessions'

const {width} = Dimensions.get('window')

import StyleSheet from './StyleSheet'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  list: {
    backgroundColor: '$white',
    flex: 1,
    width: width,
  },
  sessionRow: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: '$darkTitle',
    fontWeight: 'bold',
    padding: 8
  },
  time: {
    fontSize: 16,
    textAlign: 'center',
    color: '$gray',
  },
  ua: {
    textAlign: 'center',
    fontSize: 18,
    color: '$blue',
    fontWeight: 'bold',
    padding: 8
  },
  separator: {
    height: 1,
    backgroundColor: '$graySeparator',
  },
  crudContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: '$white',
  },
  deleteButton: {
    height: 140,
    width: 100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$red',
  },
  deleteButtonText: {
    color: '$white',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '$grayBackground',
    padding: 8,
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '$grayBorder',
    borderTopWidth: 0.5,
    borderTopColor: '$grayBorder',
  },
  sectionTitle: {
    color: '$gray',
    fontWeight: '900',
    fontSize: 16,
  }
});

class Sessions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTime: (new Date).getTime()
    }
  }

  componentDidMount() {
    this._getSessions();
  }

  _getSessions = async() => {
    try {
      let resp = await allSessions();
      if (resp) {
        this.props.updateSessions(resp.sessions)
      }
    } catch(err) {
      console.log(err)
    }
  }

  crudButtons = (session,section) => {
    if (section === 'expired') return

    const confirmText = `Are you sure you want to end this session?\n\nThis will sign out the device using it. And you will need to sign in again on that device.`;
    return (
      <View style={styles.crudContainer}>
        <TouchableHighlight
          style={styles.deleteButton}
          onPress={() => {
            confirm('End Session', confirmText, this.signOut.bind(this, session))
          }}
          underlayColor='red' >
          <Text style={styles.deleteButtonText}>End Session</Text>
        </TouchableHighlight>
      </View>
    )
  }

  signOut = async(session) => {
    try {
      const resp = await signOut(session);
      if (resp !== null && resp.sessions) {
        this.props.updateSessions(resp.sessions);
      }
    } catch (err) {
      this.props.endSession();
    }
  }

  getTimeRow = (title, time) => {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>
          {sessionDate(this.state.currentTime,time)}
        </Text>
      </View>
    )
  }

  _renderSessionRow = (session, sectionID, rowID) => {
    let signedOutAt = <View />
    if (sectionID === 'expired') {
      signedOutAt = this.getTimeRow('Signed Out:',session.expired_at)
    }

    return (
      <TouchableHighlight key={`session-row-${sectionID}-${rowID}`}>
        <View style={styles.sessionRow}>
          <Text style={styles.ua}>{humanUA(session.user_agent)}</Text>
          {this.getTimeRow('Signed In:',session.created_at)}
          {signedOutAt}
        </View>
      </TouchableHighlight>
    );
  }

  separator(sectionID, rowID) {
    return <View key={`session-${sectionID}-${rowID}`} style={styles.separator} />
  }

  renderSectionHeader(sectionData: string, sectionID: string) {
    let title;
    switch (sectionID) {
      case 'expired':
        title = 'Expired Sessions (Last 10)';
        break;
      case 'active':
        title = 'Active Sessions';
        break;
    }
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {title}
        </Text>
      </View>
    );
  }

  render() {
    let ds = new SwipeableListViewDataSource({
      getRowData: (data, sId, rId) => data[sId][rId],
      getSectionHeaderData: (data, sId) => data[sId],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    const sessionsData = ds.cloneWithRowsAndSections(this.props.sessions);
    const listSize = this.props.sessions.active.length + this.props.sessions.expired.length + 2
    return (
      <View style={styles.container}>
        <SwipeableListView style={styles.list}
                  bounceFirstRowOnMount={true}
                  maxSwipeDistance={100}
                  renderQuickActions={this.crudButtons}
                  scrollsToTop={true}
                  enableEmptySections={true}
                  automaticallyAdjustContentInsets={false}
                  dataSource={sessionsData}
                  initialListSize={listSize}
                  renderHeader={this.props.header}
                  renderRow={this._renderSessionRow}
                  renderSectionHeader={this.renderSectionHeader}
                  renderSeparator={this.separator} />
      </View>
    )
  }
}

module.exports = Sessions;
