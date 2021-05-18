import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { ReactComponent as TreeLayer } from './assets/tree_layers.svg';

import { Modal } from './modal';

import './index.css';

function App() {
  const treeLayerRef = useRef<SVGSVGElement | null>(null);
  const treeLeavesOneRef = useRef<SVGPathElement | null>(null);
  const treeLeavesTwoRef = useRef<SVGPathElement | null>(null);
  const [modalType, setModalType] = useState<'tree-leaves-1' | 'tree-leaves-2' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fill = useRef('');
  const stroke = useRef('');

  useEffect(() => {
    function handleMouseEnter(colorFill: string, type: typeof modalType) {
      return function (e: MouseEvent) {
        const target = e.target as SVGPathElement;
        fill.current = target.style.fill;
        stroke.current = target.style.stroke;
        target.style.fill = colorFill;
        target.style.stroke = 'black';
        target.style.cursor = 'pointer';
        target.onclick = () => {
          setModalType(type);
          setIsModalOpen(true);
        };
      };
    }

    function handleMouseLeave(e: MouseEvent) {
      const target = e.target as SVGPathElement;
      target.style.fill = fill.current;
      target.style.stroke = stroke.current;
    }

    if (treeLayerRef.current) {
      const treeLeavesOne = treeLayerRef.current.querySelector('#tree-leaves-1') as SVGPathElement;
      const treeLeavesTwo = treeLayerRef.current.querySelector('#tree-leaves-2') as SVGPathElement;

      if (treeLeavesOne) {
        treeLeavesOneRef.current = treeLeavesOne;
        treeLeavesOneRef.current.addEventListener('mouseenter', handleMouseEnter('red', 'tree-leaves-1'));
        treeLeavesOneRef.current.addEventListener('mouseleave', handleMouseLeave);
      }

      if (treeLeavesTwo) {
        treeLeavesTwoRef.current = treeLeavesTwo;
        treeLeavesTwoRef.current.addEventListener('mouseenter', handleMouseEnter('yellow', 'tree-leaves-2'));
        treeLeavesTwoRef.current.addEventListener('mouseleave', handleMouseLeave);
      }
    }

    return () => {
      if (treeLeavesOneRef.current) {
        treeLeavesOneRef.current.removeEventListener('mouseenter', handleMouseEnter('red', 'tree-leaves-1'));
        treeLeavesOneRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }

      if (treeLeavesTwoRef.current) {
        treeLeavesTwoRef.current.removeEventListener('mouseenter', handleMouseEnter('yellow', 'tree-leaves-2'));
        treeLeavesTwoRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div>
      <TreeLayer ref={treeLayerRef} />
      {isModalOpen && (
        <Modal handleClose={setIsModalOpen}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '50%',
              backgroundColor: '#fff',
              padding: '1.5rem',
              minHeight: 400,
              transform: 'translate(-50%, -50%)',
              borderRadius: '.5rem',
              filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, .25))',
            }}
          >
            Tree Leaves {modalType === 'tree-leaves-1' ? '#1' : '#2'}
          </div>
        </Modal>
      )}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
