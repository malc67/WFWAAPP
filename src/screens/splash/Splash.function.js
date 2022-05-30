const SplashFunctions = {
    timeOut: function (props) {
        setTimeout(() => { props.navigation.navigate("Login") }, 3000)
    },
}

export default SplashFunctions;
