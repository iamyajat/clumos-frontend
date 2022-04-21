import { Add } from '@mui/icons-material'
import { Button, Fab, List, ListItem, ListItemText, Typography } from '@mui/material'
import axios from 'axios';
import { useState, useEffect } from 'react'

const BASE_URL = process.env.REACT_APP_API_URL;

const Milestones = (props) => {
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        if (props.projectId !== "") {
            getProjectMilestones(props.projectId);
        } else {
            getUserMilestones();
        }
    }, [props.projectId]);

    //get milestone
    const getProjectMilestones = (proj_id) => {
        console.log('proj_id', proj_id);
        setMilestones([]);
        axios.post(`${BASE_URL}/api/getProjectMilestones`, {
            prjId: proj_id
        }, {
            headers: {
                Authorization: `Bearer ${props.jwt}`
            },
            params: {
                apiKey: process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            console.log('milestones', res);
            // sort response on the basis of date
            const sortedMilestones = res.data.milestone.sort((a, b) => {
                return new Date(a.created_on) - new Date(b.created_on);
            });
            console.log('sortedMilestone', sortedMilestones);

            setMilestones(sortedMilestones);
        }).catch(err => {
            console.log('err', err);
        });
    }

    const getUserMilestones = () => {
        setMilestones([]);
        axios.post(`${BASE_URL}/api/getUserMilestones`, {
            clubId: props.clubId
        }, {
            headers: {
                Authorization: `Bearer ${props.jwt}`
            },
            params: {
                apiKey: process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            console.log('milestones', res);
            // sort response on the basis of date
            const sortedMilestones = res.data.milestone.sort((a, b) => {
                return new Date(a.created_on) - new Date(b.created_on);
            });
            console.log('sortedMilestone', sortedMilestones);

            setMilestones(sortedMilestones);
        }).catch(err => {
            console.log('err', err);
        });
    }

    //new milestone
    const newMilestone = () => {
        const content = prompt('Add project milestone', '');
        axios.post(`${BASE_URL}/api/newMilestone`,
            {
                prjId: props.projectId,
                content: content,
                deadline: null
            },
            {
                headers: {
                    Authorization: `Bearer ${props.jwt}`
                },
                params: {
                    apiKey: process.env.REACT_APP_API_KEY
                }
            }
        ).then(res => {
            console.log('res', res);
            getProjectMilestones(props.projectId);
        }).catch(err => {
            console.log('err', err);
        });
    };
    return (
        <List>
            <Typography variant="h6" component="h3">
                Milestones
            </Typography>
            {milestones.map((milestone, index) => {
                return (
                    <ListItem key={index}>
                        <ListItemText primary={milestone.content} secondary={milestone.project_name} />
                    </ListItem>
                )
            })}
            {props.projectId !== "" ? (
                <Button color="primary"
                    aria-label="edit"
                    startIcon={<Add />}
                    onClick={newMilestone}>
                    Add Milestone
                </Button>) : null}
        </List>
    )
}

export default Milestones