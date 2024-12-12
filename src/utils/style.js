import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('window'); 


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#303030',
    width: '100%',
    height: 4.2*height / 10,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },





  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noFavoritesContainer: {
    flex: 1, // Ensures the container takes the full screen
    flex: 1, // Takes up the full height of the screen
    justifyContent: "center", // Vertically centers the content
    alignItems: "center", // Horizontally centers the content
    backgroundColor: "#000", // Optional background color for visibility
    height: 500,
  },
  noFavorites: {
    fontSize: 18, // Adjust font size
    color: "#d1d1d1", // Text color
    textAlign: "center", // Align text to center (if multiline text is used)
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 2,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#212124',
    width: '48%',
    height: screenWidth * 0.43,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  shiriniCard: {
    backgroundColor: '#212124',
    width: '100%',
    height: screenWidth * 0.25, // Adjust height based on your design needs
    padding: 8,
    borderRadius: 15,
    marginBottom: 20,
  },
  // card2: {
  //   backgroundColor: '#1c1c1e',
  //   width: '48%',
  //   padding: 15,
  //   borderRadius: 15,
  //   marginBottom: 20,
  // },
  
  // flagContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },
  
  // flag: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 100,
  //   marginRight: 10,
  // },
  // flag2: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 100,
  //   marginRight: 10,
  // },
  // nameSymbolContainer: {
  //   justifyContent: 'center',
  //   width: "80%"
  // },
  // name: {
  //   color: '#bbb',
  //   fontSize: 11,
  //   fontWeight: 'bold',
  // },
  // name2: {
  //   color: '#bbb',
  //   fontSize: 15,
  //   fontWeight: 'bold',
  // },
  // symbol: {
  //   color: '#777',
  //   fontSize: 12,
  // },





  flagAndTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute the elements with space between them
    alignItems: 'center',
    width: '65%', // Ensures the elements are spaced across the full width
    
  },
  
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flag: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 10,
  },

  flag2: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  
  nameSymbolContainer: {
    justifyContent: 'center',
    width: "80%",
  },
  
  name: {
    color: '#bbb',
    fontSize: 11,
    fontWeight: 'bold',
  },

  name2: {
    color: '#bbb',
    fontSize: 15,
    fontWeight: 'bold',
  },
  
  symbol: {
    color: '#777',
    fontSize: 12,
  },




  rightText: {
    color: 'white', // Adjust color to match your design
    fontSize: 28,  // Set the desired font size
    fontWeight: 'bold', // If needed
    textAlign: 'right', // Align text to the right side
  },

  
  value: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  loading_value: {
    color: '#bfbfbf',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  change: {
    fontSize: 13,
    fontWeight: 'bold',
    width : '99%'
  },
  break_line: {
    fontSize: 7,
  },
  positive: {
    color: '#4caf50',
  },
  negative: {
    color: '#f44336',
  },
  noChange: {
    color: '#bfbfbf',
  },
  
  convertButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  result: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  convertorContainer: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#0000",
    borderWidth: 1,
    borderColor: "#828282",
  },
  picker: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#393b3a",
    color: '#dedede',
    borderRadius: 5,


  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 0, // Input border is managed by inputGroup
    color: "#fff",
  },
  favoriteIcon: {
    position: 'absolute',
    // top: 0,
    left: -7.6,
  },

  iconContainer: {
    alignItems: "center", // Horizontally center the icon
    marginVertical: 8,   // Add space between input groups
  },

});

export default styles;
