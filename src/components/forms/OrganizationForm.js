import React, {useEffect, useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress';
import api from "../../services/api"
import {subnetsContainIp} from '../../services/utils'
import * as net from "net"
import {Box} from "@material-ui/core"
const YEARS=[
    {value:'-', label:'не определено'},
    {value:'1234', label:'1'},
    {value:'5234', label:'2'},
    {value:'9234', label:'3'},
]
export default function OrganizationForm(props) {
    const {
        values: { org },
        errors,
        touched,
        setFieldValue,
    } = props;

   const [orgs, setOrgs]=useState([{id:0, completename: 'Не определена', comment: ''}])
   const [loading, setLoading]=useState(true)
    useEffect(()=>{
        api.getOrgs()
            .then(data=>{
                let subnets=[]
                //str.substr(1, 2)
                if (data.data.results) {
                    const orgs=data.data.results.map(org=>{
                        const newOrg=org
                        newOrg.completename=newOrg.completename.slice(6)
                        return newOrg
                    })
                    orgs.push({id:0, completename: 'Не определена', comment: ''})
                    setOrgs(orgs)
                    if (data.data.ip){
                        subnets=orgs.map(org=>{
                            try {
                                let nets=org.comment.substr(org.comment.indexOf('[')+1, org.comment.indexOf(']')-org.comment.indexOf('[')-1)
                                const ipExist=subnetsContainIp(nets,data.data.ip)
                                return {id: org.id, containIp: ipExist.containIp, mask: ipExist.mask}
                            }catch (err) {
                                console.log('-ERR-', err)
                                return {id: org.id, isIp: false}
                            }
                        })
                        const currentOrg=subnets.filter(net=>net.containIp).reduce((res, org)=>{
                            if (org.mask>res.mask) return org
                            else return res
                        },{id:0,mask:0})
                        if (currentOrg.id>0) setFieldValue('org',currentOrg.id)
                    }
                } else setOrgs([]);
                setLoading(false)
            }).catch(err=>{
            console.log('-ERR-',err)
            setLoading(false)
        })
    },[])
    return (
        <React.Fragment>

            <Grid container spacing={3} style={{height:300}}>
                <Grid item xs={12} md={12}>
                    {
                      orgs.length > 1 ?
                        <TextField
                        name="org"
                        label="Регион обслуживания"
                        select
                        helperText={touched.org ? errors.org : ""}
                        error={Boolean(errors.org)}
                        SelectProps={{
                            MenuProps: {
                                disableScrollLock: true,
                            },
                        }}
                        value={orgs.length>1 ? org : 0 }
                        onChange={props.handleChange}
                        fullWidth
                    >
                        {orgs.map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.completename}
                            </MenuItem>
                        ))}
                    </TextField>
                        : loading
                          ? <CircularProgress size={40}/>
                          :
                            <Box m={3}>
                                <Typography variant="body2" gutterBottom >
                                    Ошибка. Список организаций недоступен.
                                </Typography>
                            </Box>
                    }
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
