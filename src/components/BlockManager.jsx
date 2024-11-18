import { useState } from 'react';
import './BlockManager.css';

function BlockManager() {
  const initialBlocks = [
    { id: 'A', items: ['Apple', 'Mango', 'Banana'] },
    { id: 'B', items: [] },
    { id: 'C', items: [] },
    { id: 'D', items: [] },
  ];

  const [blocks, setBlocks] = useState(initialBlocks);
  const [removedItems, setRemovedItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');

  const addNewBlock = () => {
    if (blocks.length < 7) {
      const newBlock = String.fromCharCode(65 + blocks.length);
      setBlocks([...blocks, { id: newBlock, items: [] }]);
    }
  };

  const moveItemForward = (blockIndex, itemIndex) => {
    const updatedBlocks = [...blocks];
    const itemToMove = updatedBlocks[blockIndex].items.splice(itemIndex, 1)[0];
    const nextBlockIndex = (blockIndex + 1) % updatedBlocks.length;

    if (updatedBlocks[nextBlockIndex].items.length < 3) {
      updatedBlocks[nextBlockIndex].items.push(itemToMove);
      setBlocks(updatedBlocks);
    } else {
      updatedBlocks[blockIndex].items.splice(itemIndex, 0, itemToMove);
      setBlocks(updatedBlocks);
    }
  };

  const moveItemBackward = (blockIndex, itemIndex) => {
    const updatedBlocks = [...blocks];
    const itemToMove = updatedBlocks[blockIndex].items.splice(itemIndex, 1)[0];
    const previousBlockIndex = (blockIndex - 1 + updatedBlocks.length) % updatedBlocks.length;

    if (updatedBlocks[previousBlockIndex].items.length < 3) {
      updatedBlocks[previousBlockIndex].items.push(itemToMove);
      setBlocks(updatedBlocks);
    } else {
      updatedBlocks[blockIndex].items.splice(itemIndex, 0, itemToMove);
      setBlocks(updatedBlocks);
    }
  };

  const removeItem = (blockIndex, itemIndex) => {
    const updatedBlocks = [...blocks];
    const [itemRemoved] = updatedBlocks[blockIndex].items.splice(itemIndex, 1);
    setRemovedItems([...removedItems, { item: itemRemoved, blockIndex }]);
    setBlocks(updatedBlocks);
  };

  const restoreItem = (itemToRestore) => {
    const updatedBlocks = [...blocks];
    const { item, blockIndex } = itemToRestore;

    if ( updatedBlocks[blockIndex].items.length < 3) {
      updatedBlocks[blockIndex].items.push(item);
      setRemovedItems(removedItems.filter(removed => removed !== itemToRestore));
      setBlocks(updatedBlocks);
    }
  };

  const removeBlock = (blockIndex) => {
    const updatedBlocks = [...blocks];
    const blockToRemove = updatedBlocks.splice(blockIndex, 1)[0];

    const itemsToRemove = blockToRemove.items.map(item => ({ item, blockIndex }));
    setRemovedItems([...removedItems, ...itemsToRemove]);

    setBlocks(updatedBlocks);
  };

  const addItemToBlock = () => {
    const blockIndex = blocks.findIndex(block => block.id === selectedBlock.toUpperCase());
    if (blockIndex !== -1 && newItemName && blocks[blockIndex].items.length < 3) {
      const updatedBlocks = [...blocks];
      updatedBlocks[blockIndex].items.push(newItemName);
      setBlocks(updatedBlocks);
      setNewItemName('');
      setSelectedBlock('');
    } else {
      alert("Please enter a valid target block and item name, and make sure the block has space for new items.");
    }
  };

  return (
    <div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Target Block (A, B, ...)"
          value={selectedBlock}
          onChange={(e) => setSelectedBlock(e.target.value)}
        />
        <button onClick={addItemToBlock}>Add Item</button>
      </div>

      {blocks.map((block, blockIndex) => (
        <div key={block.id} className="block">
          <h3>Block {block.id}</h3>
          <button onClick={() => removeBlock(blockIndex)}>Delete Block</button>
          {block.items.map((item, itemIndex) => (
            <div key={itemIndex} className="item">
              <span>{item}</span>
              <button onClick={() => moveItemBackward(blockIndex, itemIndex)}>←</button>
              <button onClick={() => moveItemForward(blockIndex, itemIndex)}>→</button>
              <button onClick={() => removeItem(blockIndex, itemIndex)}>Delete</button>
            </div>
          ))}
        </div>
      ))}

      {blocks.length < 7 && <button onClick={addNewBlock}>Add New Block</button>}

      <div className="removed-items">
        <h3>Removed Items</h3>
        {removedItems.map((removed, index) => (
          <div key={index}>
            <span>{removed.item}</span>
            <button onClick={() => restoreItem(removed)}>Restore</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockManager;
