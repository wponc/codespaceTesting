/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "./style.css";
import { defineCustomElements as defineMapElements } from "@arcgis/map-components/dist/loader";
import { defineCustomElements as defineCalciteElements } from "@esri/calcite-components/dist/loader";
defineCalciteElements(window, {
  resourcesUrl: "https://js.arcgis.com/calcite-components/2.9.0/assets"
});
defineMapElements(window, {
  resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets"
});
document.querySelector("arcgis-layer-list").addEventListener("arcgisLayerListReady", (event) => {
  const arcgisLayerList = event.target;
  arcgisLayerList.listItemCreatedFunction = (event) => {
    const { item } = event;
    if (item.layer.type !== "group") {
      item.panel = {
        content: "legend"
      };
    }
  };
});
document.querySelector("arcgis-map").addEventListener("arcgisViewReadyChange", (event) => {
  const { portalItem } = event.target.map;
  const navigationLogo = document.querySelector("calcite-navigation-logo");
  navigationLogo.heading = portalItem.title;
  navigationLogo.description = portalItem.snippet;
  navigationLogo.thumbnail = portalItem.thumbnailUrl;
  const layer = event.target.map.layers.find((layer) => layer.id === "Accidental_Deaths_8938");
  layer.popupTemplate.title = "Accidental Deaths";
});
