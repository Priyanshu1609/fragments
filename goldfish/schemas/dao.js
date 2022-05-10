export default {
  name: 'dao',
  type: 'document',
  title: 'Daos',
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
      name: 'discord_link',
      type: 'string',
      title: 'Discord URL',
    },
    {
      name: 'website_link',
      type: 'string',
      title: 'Website URL',
    },
    {
      name: 'created_by',
      type: 'string',
      title: 'Created By',
    },
  ],
}
