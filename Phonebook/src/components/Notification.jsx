const Notification=({notification})=>{
    if(!notification) return null
    const style={
        color: notification.type=== 'success' ? 'green': 'red',
        backgrouf: '#eee',
        fontSize: 20,
        border: `2px solid ${notification.type=== 'success' ? 'green': 'red'}`,
        borderRadius:5,
        padding:10,
        marginBottom:10,
    }

    return <div style={style}>{notification.message}</div>
}


export default Notification
