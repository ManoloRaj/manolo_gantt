import logo from './logo.svg';
import './App.css';
import './assets/style.css';
import {useState, useRef} from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const data_phase = [
   
    {
      'nom_phase' : 'Enquete',
      'couleur'   : 'rgb(0, 195, 255)',
      'propriete' : 'Manolo',
      'date_debut': '19-05-2022',
      'date_fin'  : '21-05-2022',
      'debut'     : 0
    }, 
    {
      'nom_phase': 'Recrutement 1',
      'couleur': 'rgb(131, 2, 170)',
      'propriete': 'Manohy',
      'date_debut': '21-05-2022',
      'date_fin'  : '23-05-2022',
      'debut'     : 1
    },
    {
      'nom_phase': 'Recrutement 2',
      'propriete': 'Manohy',
      'date_debut': '23-05-2022',
      'date_fin'  : '26-05-2022',
      'debut'     : 2
    },
    {
      'nom_phase': 'Recrutement 3',
      'propriete': 'Manohy',
      'date_debut': '23-05-2022',
      'date_fin'  : '26-05-2022',
      'debut'     : 7
    }

];

function Table({data}){

  console.log(data);

  return(
  <>
    <div className='table'>
      <div className='left'>
        {data.map((data)=>{
          return (

          <div className='left_bar_title'>
            <div className='columns'>{data.nom_phase}</div>
            <div className='columns'>{data.date_debut}</div>
            <div className='columns'>{data.date_fin}</div>
            <div className='columns ajouter'>
              <Stack spacing={2} direction="row">
                <CircularProgress style={{width:'20px'}} variant="determinate" value={20} />
              </Stack>
            </div>
          </div>);

        })}
        
      </div>

      <div className='right'>
        {data.map((data)=>{
          return (<Row phase={data} />);
        })}
        
        
      </div>   
    </div>
    </>
    );
}
function Row({phase}){
 
  const [position_element, setPosition_element] = useState(phase.debut*100);
  const [dragging, setDragging] = useState(false);
  const [dragging_width, setDragging_width] = useState(false);
  const [width, setWidth] = useState(100);
  const [prev_positionX, setPrev_positionX] = useState(0);

  //const [phase_activite_detail, setPhase_activite_detail] = useState(phase);

  //Detail de l'activité dans dialogue
  const startDrag = (e)=>{
    //console.log('start dragg')
    setDragging(true);
  }
  const dragging_handle = (e)=>{
    if(dragging === true){
      setPosition_element(e.nativeEvent.clientX - 450);
    }
  }
  const endDrag = (e)=>{
    //console.log('stop dragg')
    setDragging(false);
  }

  const startDrag_width = (e) => {
    setDragging_width(true)
    setPrev_positionX(e.nativeEvent.clientX)
  }
  const dragging_handle_width = (e) => {
    
    if(dragging_width === true){

        setWidth(width - (prev_positionX - e.nativeEvent.clientX));
        setPrev_positionX(e.nativeEvent.clientX);
        console.log(width)
        
    }
  }
  const endDrag_width = (e) => {
    setDragging_width(false)
    console.log("bye")
  }


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='row' onMouseUp={endDrag} onMouseMove={dragging_handle}  >

        <div className='element_ensemble' 
              style={{width : width+'px' }} 
              onMouseMove={dragging_handle_width}  
              >
          
          <div className='draggable_element' 
                style={{ left: position_element+'px', backgroundColor: phase.couleur}} 
                onMouseDown = {startDrag}  
                onMouseUp={endDrag} 
                onDoubleClick={handleClickOpen}>

            <div className='deplacement'>
              
            </div>

          </div>

          <div className='width_cursor'
                style={{ left: position_element+10+'px'}} 
                onMouseDown = {startDrag_width} 
                onMouseMove={dragging_handle_width}
                onMouseUp={endDrag_width} >
            <div className='style'>
              
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        >
        <DialogTitle id="alert-dialog-title">
          Phase : {phase.nom_phase}
        </DialogTitle>
        <DialogContent>
          <div className='dialog_content'>
          Planning opérationnel
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

</>
  );
}

function App() {
  return (
    <Table data={data_phase} />
  );
}


export default App;
