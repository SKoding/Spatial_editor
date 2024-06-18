//Import Icons from Material UI */
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';


const UsageItems = [
    {
        id: 1,
        icon: <EmojiObjectsOutlinedIcon />,
        title: "Select Objective",
        description: "You can find seedlots for your planting site or planting sites for your seedlot."
    },
    {
        id: 2,
        icon: <MyLocationOutlinedIcon />,
        title: "Select Location",
        description: "Select Location for Planting Exercise."
    },
    {
        id: 3,
        icon: <MapOutlinedIcon />,
        title: "Reafforestation Area",
        description: "TPK suggests areas available for planting trees in the area selected."
    },{
        id: 4,
        icon: <ForestOutlinedIcon />,
        title: "Select Source of Seedlings",
        description: "Choose source of tree seedlings from a suggestion by TPK of available seedlings."
    },{
        id: 5,
        icon: <YardOutlinedIcon />,
        title: "SetOut Activity",
        description: "Start Planting activity."
    },{
        id: 6,
        icon: <VerifiedOutlinedIcon />,
        title: "Complete Exercise",
        description: "Mark Activity Done after planting exercise."
    }
]

export default UsageItems;