import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAllOperators,
  deleteSingleOperator,
  editOperator,
  createOperatorBlock,
  copyOperatorBlockById,
} from '../../api';

type OperatorState = {
  loading: Boolean;
  entries: Operator[];
  currentIndex: number | null;
};

const initialState: OperatorState = {
  loading: false,
  entries: [],
  currentIndex: null,
};

type ChangePayload = Omit<Operator, 'type'>;

export const fetchOperators = createAsyncThunk(
  'operators/fetchOperators',
  async () => {
    const response = await getAllOperators();
    return response.data;
  }
);

export const deleteOperatorById = createAsyncThunk(
  'operators/deleteOperator',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as { operators: OperatorState };
    if (state.operators.currentIndex !== null) {
      const id = state.operators.entries[state.operators.currentIndex].id;
      const response = await deleteSingleOperator(id);
      return response.data;
    }
  }
);

export const changeOperator = createAsyncThunk(
  'operators/editOperator',
  async (payload: ChangePayload, thunkApi) => {
    const response = await editOperator(payload);
    return response;
  }
);

export const createNewOperator = createAsyncThunk(
  'operators/createNewOperator',
  async (operatorType: Operator['type'], thunkApi) => {
    const response = await createOperatorBlock({ type: operatorType });
    return response;
  }
);

export const copyOperator = createAsyncThunk(
  'operators/copy',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as { operators: OperatorState };
    if (state.operators.currentIndex === null) {
      return;
    }
    const id = state.operators.entries[state.operators.currentIndex].id;
    const response = await copyOperatorBlockById(id);
    return response;
  }
);

const operatorsSlice = createSlice({
  name: 'operators',
  initialState,
  reducers: {
    setCurrentOperator: (state, action: PayloadAction<number | null>) => {
      state.currentIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOperators.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOperators.fulfilled, (state, action) => {
      state.loading = false;
      state.entries = action.payload;
    });

    builder.addCase(deleteOperatorById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(deleteOperatorById.fulfilled, (state, action) => {
      state.loading = false;
      if (state.currentIndex !== null) {
        state.entries.splice(state.currentIndex, 1);
        state.currentIndex =
          state.currentIndex >= state.entries.length
            ? state.entries.length - 1
            : state.currentIndex;
      }
    });

    builder.addCase(changeOperator.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(changeOperator.fulfilled, (state, action) => {
      state.loading = false;
      const operator = state.entries.find(
        (operator) => operator.id === action.payload.data.data.id
      );
      if (operator) {
        operator.primaryInput = action.payload.data.data.primaryInput;
        operator.secondaryInput = action.payload.data.data.secondaryInput;
      }
    });
    builder.addCase(createNewOperator.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNewOperator.fulfilled, (state, action) => {
      state.loading = false;
      state.entries.push(action.payload.data.data);
      state.currentIndex = state.entries.length - 1;
    });
    builder.addCase(copyOperator.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(copyOperator.fulfilled, (state, action) => {
      state.loading = false;
      if (state.currentIndex !== null && action.payload) {
        state.entries.splice(
          state.currentIndex + 1,
          0,
          action.payload.data.data
        );
        state.currentIndex++;
      }
    });
  },
});

export default operatorsSlice;
export const operatorReducer = operatorsSlice.reducer;
export const { setCurrentOperator } = operatorsSlice.actions;
