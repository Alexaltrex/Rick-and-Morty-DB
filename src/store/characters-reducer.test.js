import charactersReducer, {charactersAC} from "./characters-reducer";

it('set current page', () => {
    let action = charactersAC.setCurrentPage(2);
    let state = {currentPage: 1}
    let newState = charactersReducer(state, action);
    expect(newState.currentPage).toBe(2)
});


