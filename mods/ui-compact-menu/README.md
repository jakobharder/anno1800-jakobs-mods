![](./banner.jpg)

Reduce construction menu scrolling with better grouping of entries.

## Tabs

- Consumables tab is split into Farmer to Investor and Scholar, Tourist and Skyscraper tab
- Culture tab is merged into City and Public Services tab

## Groups

### Citys Tab Groups

- Marketplace: vanilla, Pescatarian community center
- Religion: Lion053's chapels, church, Pescatarian community center
- Education: school, library, music school, university
- Tourists: public mooring, bus stop, hotel, small hotel, restaurant, cafe, bar, iron tower
- Malls: department store, furniture store, drug store
- Culture: zoo, museum, botanical garden, world fair

### Public Services Groups

- Tourists: public mooring, bus stop, hotel, small hotel, restaurant, cafe, bar, iron tower
- Institutions: fire station, police, hospital
- Administration: guild house, harbour master, town hall
- Electricity: vanilla, river power plant, small power plants

### Harbour Groups

- Harbour guns: all vanilla harbour weapons

## Notes

This mod does not recreate the whole menu, but only combines what is correctly added.
Some mods add their icon only to either progression type sorting or category type sorting.
Please contact the respective mod authors for fixes.

Contact me if you have any mod conflicts so that I can take care of them.

## Modders

### Add to Groups

You need to add a tag to your building to be included in one of the new groups.

```xml
<ConstructionCategory>
  <BuildingList>
    ...
    <Item>
      <Building>123</Building>
      <CompactAdministration />
    </Item>
    ...
  </BuildingList>
</ConstructionCategory>
```

The changes are applied with `LoadAfterIds: '*'`.
Avoid adding your building in that loading stage, otherwise contact me to add a dependency.

#### Available Tags

Tag | Category | Region | Comment
---|---|---|---
`CompactAdministration` | City | OW, NW
`CompactInstitution` | City | OW, NW
`CompactEducation` | Services | OW
`CompactReligion` | Services | OW
`CompactOrchard` | Consumables | NW | only for hiding, progress menu group is used
`CompactMarket` | Services | OW | only groups when there are 2+ buildings
`CompactTourist` | City, Services | OW
`CompactCulture` | Services | OW
`CompactMall` | Services | OW
`CompactEntertainment` | Services | OW

#### Handle Own Groups

Add entries with `<PlatformVisibility>Console</PlatformVisibility>` as if you had no group of your own.
Those entries will only be considered when using this mod.
You must use `CompactBuilding` instead of `Building` though, because unfortunately hidding applies to all instances of the same GUID.

Additionally add `<CompactHide />` to your group to make it disappear when using this mod.


```xml
<ModOp Type="addNextSibling" GUID="25000192,500447"
  Path="/Values/ConstructionCategory/BuildingList/Item[Engineer or Investor&lt;=5000][last()]">
  <!-- mall category -->
  <Item>
    <Building>1500010868</Building>
    <Investor>5000</Investor>
    <!-- hide with compact ui -->
    <CompactHide />
  </Item>
  <!-- mall building -->
  <Item>
    <!-- important! use CompactBuilding -->
    <CompactBuilding>1500010888</CompactBuilding>
    <!-- mark for mall category pickup -->
    <CompactMall />
    <Investor>5000</Investor>
    <!-- hide by default -->
    <PlatformVisibility>Console</PlatformVisibility>
  </Item>
  <!-- more malls -->
</ModOp>
```

### Add to Category Tabs

By default mod buildings are added to public services and vanilla tier consumables.

Add `City` or `Secondary` if you want to change that.
The changes are applied with `LoadAfterIds: '*'`.
Avoid adding your building in that loading stage, otherwise contact me to add a dependency.

Merge culture building into City tab instead of Public Services tab:

```xml
<ConstructionCategory>
  <BuildingList>
    ...
    <Item>
      <Building>123</Building>
      <City />
    </Item>
    ...
  </BuildingList>
</ConstructionCategory>
```

Merge Consumable building into Tourist, Skyscraper, Scholar tab:

```xml
<ConstructionCategory>
  <BuildingList>
    ...
    <Item>
      <Building>123</Building>
      <Secondary />
    </Item>
    ...
  </BuildingList>
</ConstructionCategory>
```

## Changes

### 2.3

- Added jje's buildings

### 2.2

- Schools, Churches and Malls in progression sorting menus

### 2.1

- Tags to easily add mod buildings to groups

### 2.0

- Split Consumables into vanilla tiers and DLC tiers
- Merge Culture tab into City and Public Services
- Group OW electricity, education and religion, culture buildings

## Credits

Thanks to darknesswei, DrD_AVEL, modpark817 for the translations!
