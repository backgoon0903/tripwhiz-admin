import { Typography, Grid } from '@mui/material';



//삭제 금지 XX
function PageHeader() {
  const user = {
    name: '밍쥬 차',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Q & A
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent transactions
        </Typography>
      </Grid>

    </Grid>
  );
}

export default PageHeader;