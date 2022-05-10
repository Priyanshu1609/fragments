export default {
  name: 'vault',
  type: 'document',
  title: 'Vaults',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
    },
    {
      name: 'created_by',
      type: 'string',
      title: 'Created By',
    },
    {
      name: 'token_name',
      type: 'string',
      title: 'Token Name',
    },
    {
      name: 'token_supply',
      type: 'number',
      title: 'Token Supply',
    },
    {
      name: 'management_fees',
      type: 'number',
      title: 'Management Fees',
    },
    {
      name: 'vault_address',
      type: 'string',
      title: 'Vault Address',
    },
  ],
}
