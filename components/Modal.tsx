import React, { useContext } from "react";
import UserContext from "./Context/UserContext"
import { Modal as DefaultModal, StyleSheet, Text, Pressable, View, ScrollView, Dimensions, } from "react-native";

const Modal = () => {
  const userContext = useContext(UserContext)
  let { showNotificationsModal, openModal, notifications } = userContext
  return (
    <View style={!!showNotificationsModal === true ? styles.centeredView : styles.hidden}>
      <DefaultModal
        animationType="slide"
        transparent={true}
        visible={showNotificationsModal}
        onRequestClose={() => {
          openModal();
        }}
      >
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => openModal()}
              >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Notifications</Text>
            <ScrollView >
              {
                notifications.map((x, xI) => {
                  return (
                    <View
                      key={xI}
                      style={[{marginTop: -1}, styles.notification, x.new === true ? styles.newNotification : styles.readNotification]}
                    >
                      <Text style={styles.notificationTitle}>{x.subject}</Text>
                      <Text style={styles.notificationText}>{x.body}</Text>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
      </DefaultModal>
    </View>
  );
};
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
    elevation: 0,
    left: 5,
    position: 'absolute',
    top: 5,
  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hidden: {
    display: 'none',
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    marginTop: windowHeight * .1,
    marginHorizontal: windowWidth * .05,
    maxHeight: windowHeight * .8,
    padding: 35,
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: windowWidth * .9
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },
  newNotification: {
    backgroundColor: '#c4c4c4',
  },
  notification: {
    borderWidth: 1,
  },
  notificationText: {
    paddingHorizontal: 8,
    paddingBottom: 8
  },
  notificationTitle: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  readNotification: {
    
  },
  textStyle: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default Modal;