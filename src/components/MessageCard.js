import { Avatar, Card, CardContent, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const MessageCard = (props) => {

    const getTimeAgo = (date) => {
        return timeAgo.format(date)
    }


    return (
        <Card variant="outlined"
            // padding bottom
            sx={{
                marginBottom: '1rem',
                padding: '0',
            }}
        >
            <CardContent>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                    </ListItemAvatar>
                    <ListItemText primary={props.posted_by} secondary="Admin" />
                </ListItem>
                <div
                    style={
                        {
                            padding: '1rem',
                        }
                    }>

                    <Typography variant="h6" component="h3">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.content}
                    </Typography>


                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{
                            fontSize: '0.75rem',
                            marginTop: '1rem',

                        }}

                    >
                        {getTimeAgo(new Date(props.date))}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default MessageCard