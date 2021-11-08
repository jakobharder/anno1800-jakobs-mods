# Extra Goods Collection

## Notes for Players

You only need this mod if another mod told you so.

The goods in this mod are not unlocked by default.
They are only usable through other mods.

You might want to look at [Pescatarians (Alternative Population)](https://github.com/jakobharder/anno-1800-jakobs-mods) or [Taller Low Tier Residences](https://github.com/jakobharder/anno-1800-jakobs-mods).

## Notes for Modders

Feel free to depend on this mod for your own creations.
Do not copy contents of the mod into yours, but point to download links on *GitHub* or *Nexus Mods*.
Otherwise people will end up with breaking version conflicts.

The goods do not unhide/unlock by default, as the timing depends on what you want to use them for.
Please add unhide/unlock to every mode based on your needs.
In case of combinations the earliest unlock wins, so it should be fine.

Linen, Suits and Canned Fish depend on Land of Lions.
Make sure to remind the players if you use those goods.

*Note: You can use Hemp good, Hemp production and Canned Fish good.*
*But there won't be any build menu or production building for Canned Fish without Land of Lions.*

The rest has no DLC dependencies.

### Contribute

If you have products and production and want to add them to the collection, feel free to ping me or open an issue/PR.

## Goods

Use AssetPool GUIDs to unlock the products with their production chains.

| Icon | Name | Region | GUID | Unlock | AssetPool | Comment
| --- | --- | --- | --- | --- | --- | ---
| <img src="./doc/icon_wooden_ring.png" style="width:24px"/> | Wooden<br/>Accessories | Old World |1500010150 | - | 1500010162
| <img src="./doc/icon_sheep_milk.png" style="width:24px"/> | Milk | Old World | 1440005 | - | 1500010167 | New Horizon GUID
| <img src="./doc/icon_sheep_cheese.png" style="width:24px"/> | Cheese | Old World | 1500010102 | - | 1500010167
| <img src="./data/jakob/ui/icons/icon_olives.png" style="width:24px"/> | Olives | Old World | 1500010105 | - | 1500010166
| <img src="./data/jakob/ui/icons/icon_olive_soap.png" style="width:24px"/> | Olive Soap | Old World | 1500010106 | - | 1500010166
| <img src="./doc/icon_tools.png" style="width:24px"/> | Tools | Old World | 1500010153 | - | 1500010163
| <img src="./doc/icon_canned_food.png" style="width:24px"/> | Canned Fish | Old World | 1500010120 | - | 1500010164
| <img src="./data/jakob/ui/icons/icon_hemp.png" style="width:24px"/> | Hemp | Old World | 1440224 | - | 1500010165 | New Horizon GUID
| <img src="./doc/icon_linen_fabric.png" style="width:24px"/> | Linen | Old World | vanilla | - | 1500010165
| <img src="./data/jakob/ui/icons/icon_suits.png" style="width:24px"/> | Suits | Old World | 1500010127 | - | 1500010165
| <img src="./doc/icon_beer_2.png" style="width:24px"/> | Bottled Beer | Old World | 1500010156 | - | 1500010168

New Horizon GUIDs are shared with permission.

### Unlock Trigger Template

I know you want to copy&paste. Here you go. 

⚠ Never ever copy&paste triggers from mods directly. You publish once a trigger with a GUID from another mod and you screw up not only your mod but the other one as well.

```xml
<Asset>
  <Template>Trigger</Template>
  <Values>
    <Standard>
      <GUID>your GUID</GUID>
      <Name>unlock everything</Name>
    </Standard>
    <Trigger>
      <TriggerCondition>
        <Template>ConditionPlayerCounter</Template>
        <Values>
          <Condition />
          <ConditionPlayerCounter>
            <PlayerCounter>PopulationByLevel</PlayerCounter>
            <!-- artisans -->
            <Context>15000002</Context>
            <CounterAmount>100</CounterAmount>
          </ConditionPlayerCounter>
        </Values>
      </TriggerCondition>
      <TriggerActions>
        <Item>
          <TriggerAction>
            <Template>ActionUnlockAsset</Template>
            <Values>
              <Action />
              <ActionUnlockAsset>
                <UnlockAssets>
                  <Item>
                    <!-- wooden accessory asset pool -->
                    <Asset>1500010162</Asset> 
                  </Item>
                  <Item>
                    <!-- cheese asset pool -->
                    <Asset>1500010167</Asset>
                  </Item>
                  <!-- you get the idea -->
                </UnlockAssets>
              </ActionUnlockAsset>
            </Values>
          </TriggerAction>
        </Item>
      </TriggerActions>
    </Trigger>
    <TriggerSetup />
  </Values>
</Asset>
```