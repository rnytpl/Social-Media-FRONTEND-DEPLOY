import { Grid, Box, Typography } from "@mui/material"

const Error = ({ error }) => {
    return (
        <Grid item>
            <Box>
                <Typography fontSize="11px" color="#ff6d62">* {error}</Typography>
            </Box>
        </Grid>
    )
}
export default Error