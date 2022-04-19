import { Card, CardContent, Typography } from "@mui/material"
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
            }}
        >
            <CardContent>
                <Typography variant="h5" component="h2">
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
            </CardContent>
        </Card>
    )
}

export default MessageCard