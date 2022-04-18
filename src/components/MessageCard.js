import { Card, CardContent, Typography } from "@mui/material"


const MessageCard = (props) => {
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
            </CardContent>
        </Card>
    )
}

export default MessageCard