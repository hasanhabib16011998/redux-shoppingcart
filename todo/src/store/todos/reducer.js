import { initialState } from "./initialState";
import { ADDED, ALLCOMPLETED,CLEARCOMPLETED, COLORSELECTED,TOGGLED, DELETED} from './actionTypes';


const nextToDoId = (todos) => {
    const maxID = todos.reduce((maxID,todo) => Math.max(todo.id,maxID),-1);
    return maxID+1;

}
const reducer = (state = initialState,action) => {
    switch(action.type){
        case ADDED:
            return [
                ...state,
                {id:nextToDoId(state)}
            ]
        case TOGGLED:
            return state.map(todo => {
                if(todo.id !== action.payload){
                    return todo;
                }
                return{ 
                    ...todo,
                    completed: !todo.completed,
                }
            })
        case COLORSELECTED:
            const { todoID, color } = action.payload;
            return state.map(todo => {
                if(todo.id !== todoID){
                    return todo;
                }
                return{ 
                    ...todo,
                    color: color,
                }
            })
        case DELETED:
            return state.filter(todo=> todo.id!==action.payload);

        case ALLCOMPLETED:
            return state.map(todo=>{
                return{
                    ...todo,
                    completed: true
                }
            })
        
            case CLEARCOMPLETED:
                return state.filter(todo=> !todo.completed);
        default:
            return state;
    }
}

export default reducer;