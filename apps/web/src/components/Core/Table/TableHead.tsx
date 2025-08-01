import type { JSX } from 'react';

import { useContext } from 'react';

import TableHeaderCell from '@/components/Core/Table/TableHeaderCell';
import { TableContext } from '@/components/Core/Table/TableWrapper';

function TableHead(): JSX.Element {
  const { handleSort, header, sortData } = useContext(TableContext);
  return (
    <thead data-testid="thead" className="text-left">
      <tr className="border-semi-10-contrast border-b-solid border-b-[1px]">
        {header?.map(({ label, sortable, type }: never, index: number) => (
          <TableHeaderCell
            currentSortedData={sortData?.index === index ? sortData : null}
            isSortable={sortable}
            key={`tableHeaderCell__${index}`}
            label={label}
            onSort={(sortDirection) => handleSort(index, sortDirection, type)}
          />
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
