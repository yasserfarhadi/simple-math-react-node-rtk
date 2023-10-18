import fs from 'node:fs/promises';
import path from 'node:path';
import { v4 as uuid } from 'uuid';

const dataPath = path.join(process.cwd(), 'data.json');

export async function getOperators(req, res, next) {
  const bufferData = await fs.readFile(dataPath, 'utf-8');
  const operators = JSON.parse(bufferData);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(operators);
}

export async function createOperator(req, res, next) {
  const { type } = req.body;
  const bufferData = await fs.readFile(dataPath, 'utf-8');
  const newOperators = JSON.parse(bufferData);
  const createdOperator = {
    id: uuid(),
    primaryInput: 0,
    secondaryInput: type === 'DIVIDE' ? 1 : 0,
    type,
  };
  newOperators.data.push(createdOperator);
  await fs.writeFile(dataPath, JSON.stringify(newOperators));
  res.status(201).json({
    message: 'operator created successfuly',
    data: createdOperator,
  });
}

export async function copyOperator(req, res, next) {
  const { id } = req.body;
  const bufferData = await fs.readFile(dataPath, 'utf-8');
  const newOperators = JSON.parse(bufferData);
  const index = newOperators.data.findIndex((op) => op.id === id);
  let newCoppiedOperator;
  if (index >= 0) {
    newCoppiedOperator = {
      id: uuid(),
      primaryInput: 0,
      secondaryInput: newOperators.data[index].type === 'DIVIDE' ? 1 : 0,
      type: newOperators.data[index].type,
    };
    newOperators.data.splice(index, 0, newCoppiedOperator);
    await fs.writeFile(dataPath, JSON.stringify(newOperators));

    res.status(201).json({
      message: 'operator coppied successfuly',
      data: newCoppiedOperator,
    });
  }
}

export async function deleteOperator(req, res, next) {
  const { id } = req.params;
  const bufferData = await fs.readFile(dataPath, 'utf-8');
  const newOperators = JSON.parse(bufferData);
  const index = newOperators.data.findIndex((op) => op.id === id);
  newOperators.data.splice(index, 1);
  await fs.writeFile(dataPath, JSON.stringify(newOperators));

  res.status(201).json({
    message: 'operator deleted successfuly',
    data: { id },
  });
}

export async function editOperator(req, res, next) {
  const { id, primaryInput, secondaryInput } = req.body;
  const bufferData = await fs.readFile(dataPath, 'utf-8');
  const newOperators = JSON.parse(bufferData);
  const index = newOperators.data.findIndex((op) => op.id === id);
  newOperators.data[index].primaryInput = primaryInput;
  newOperators.data[index].secondaryInput = secondaryInput;
  await fs.writeFile(dataPath, JSON.stringify(newOperators));

  res.status(201).json({
    message: 'operator edited successfuly',
    data: newOperators.data[index],
  });
}
