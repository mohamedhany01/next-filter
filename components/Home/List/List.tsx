import Item from '../Item/Item';
import { NextPage } from 'next';

import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

interface Props {
  list: any;
}
const List: NextPage<Props> = ({ list }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' component='div' sx={{ mt: 2 }}>
            Products:({list.length === 0 ? 0 : list.length})
          </Typography>
        </Box>
        <Divider sx={{ mt: 2 }} />
        {list.map((item: any) => (
          <Item key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  );
};

export default List;
