'use client'

import { Button, Dropdown } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

const ActionButton = () => {
  const menuItems = [
    { key: 'edit', label: 'Edit' },
    { key: 'view', label: 'View Details' },
    { key: 'divider', type: 'divider' as const },
    { key: 'delete', label: 'Delete', danger: true },
  ]

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement='bottomRight'
      trigger={['click']}
    >
      <Button
        type='text'
        size='small'
        icon={<MoreOutlined />}
        aria-label='Open menu'
      />
    </Dropdown>
  )
}

export default ActionButton
