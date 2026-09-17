import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function TestComponent() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
        <Typography variant="h3" gutterBottom>
        السلام عليكم ورحمة الله وبركاته 
      </Typography>
      



    </Stack>
  );
}