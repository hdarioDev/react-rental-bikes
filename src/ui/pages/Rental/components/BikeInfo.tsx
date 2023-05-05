import { List, ListItem, ListItemText, Divider, Box } from "@mui/material";

const BikeInfo = ({ state, rentalPrice }: any) => {
  return (
    <List
      sx={{ width: "300px", maxWidth: 360, bgcolor: "gray" }}
      component="nav"
      aria-label="mailbox folders"
    >
      <ListItem button>
        <ListItemText primary={`TIPO: ${state.type}`} />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary={`BICICLETA: ${state.name}`} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={`PRECIO: ${state.price}`} />
      </ListItem>
      <Divider light />
      <ListItem button>
        <Box
          component="img"
          alt={state.name}
          src={state.image}
          sx={{ width: 104, height: 104, borderRadius: 2 }}
        />{" "}
      </ListItem>
      <Divider light />

      <ListItem button>
        <ListItemText primary={`TOTAL:${rentalPrice}`} />
      </ListItem>
    </List>
  );
};

export default BikeInfo;
