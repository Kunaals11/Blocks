import { useState } from 'react';
import './BlockManager.css'

function BlockManager() {
  const initialBlocks = [
    { id: 'A', items: ['Apple', 'Mango', 'Banana', 'Orange'] },
    { id: 'B', items: [] },
    { id: 'C', items: [] },
    { id: 'D', items: [] },
  ];

  const [blocks, setBlocks] = useState(initialBlocks);
  const [deletedItems, setDeletedItems] = useState([]); // Stores both item and blockIndex

  const addBlock = () => {
    if (blocks.length < 7) {
      const newBlockId = String.fromCharCode(65 + blocks.length);
      setBlocks([...blocks, { id: newBlockId, items: [] }]);
    }
  };

  const moveForward = (blockIndex, itemIndex) => {
    const newBlocks = [...blocks];
    const item = newBlocks[blockIndex].items.splice(itemIndex, 1)[0];
    if (blockIndex < newBlocks.length - 1) {
      newBlocks[blockIndex + 1].items.push(item);
      setBlocks(newBlocks);
    }
  };

  const moveBackward = (blockIndex, itemIndex) => {
    const newBlocks = [...blocks];
    const item = newBlocks[blockIndex].items.splice(itemIndex, 1)[0];
    if (blockIndex > 0) {
      newBlocks[blockIndex - 1].items.push(item);
      setBlocks(newBlocks);
    }
  };

  const deleteItem = (blockIndex, itemIndex) => {
    const newBlocks = [...blocks];
    const [deletedItem] = newBlocks[blockIndex].items.splice(itemIndex, 1);
    setDeletedItems([...deletedItems, { item: deletedItem, blockIndex }]);
    setBlocks(newBlocks);
  };

  const restoreItem = (itemToRestore) => {
    const newBlocks = [...blocks];
    const { item, blockIndex } = itemToRestore;

    if (newBlocks[blockIndex]) {
      newBlocks[blockIndex].items.push(item);
    }

    setBlocks(newBlocks);
    setDeletedItems(deletedItems.filter(deleted => deleted !== itemToRestore));
  };

  return (
    <div>
      {blocks.map((block, blockIndex) => (
        <div key={block.id}>
          <h3>Block {block.id}</h3>
          {block.items.map((item, itemIndex) => (
            <div key={itemIndex}>
              <span>{item}</span>
              {blockIndex > 0 && (
                <button onClick={() => moveBackward(blockIndex, itemIndex)}>←</button>
              )}
              {blockIndex < blocks.length - 1 && (
                <button onClick={() => moveForward(blockIndex, itemIndex)}>→</button>
              )}
              <button onClick={() => deleteItem(blockIndex, itemIndex)}>Delete</button>
            </div>
          ))}
        </div>
      ))}

      {blocks.length < 7 && <button onClick={addBlock}>Add More</button>}

      <div>
        <h3>Deleted Items</h3>
        {deletedItems.map((deleted, index) => (
          <div key={index}>
            <span>{deleted.item}</span>
            <button onClick={() => restoreItem(deleted)}>Restore</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockManager;
