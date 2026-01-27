// Letter Master Order - External JavaScript
// Matches source functionality exactly
// jQuery dependency assumed from theme

jQuery(function ($) {
  'usestrict';

  // Initial hide for individual tab elements (to prevent flash before reset/init)
  $('#tab-content-indv .letters').hide();
  $('#tab-content-indv .price-and-button-wrapper').hide();

  // Global state
  var currentCollectionHandleIndv = null;
  var currentCollectionHandleSet = null;
  var currentParentHandle = null;
  var currentActiveTab = 'indv';
  var masterCollectionsData = window.masterCollectionsData || {}; // Reference global data from Liquid

  // UI Reset Functions (Modularized for both tabs)
  function resetFormUI(tab) {
    var $tabContent = $('#tab-content-' + tab);
    $tabContent.find('.letter-height').val('');
    $tabContent.find('.letter-color').html('<option value="">Select Color</option>').attr('disabled', true);
    $tabContent.find('.price').text('$0.00').removeData('variant-id');
    $tabContent.find('.add-btn').attr('disabled', true);
    $tabContent.find('.sold-out-btn').hide();

    // === MODIFICATION ===
    $tabContent.find('.form-image-title-placeholder').html('');
    // === END MODIFICATION ===

    if (tab === 'indv') {
      $tabContent.find('.letters input').val('');
      $tabContent.find('.letter').show();
      $tabContent.find('.error-chars, .error-color').hide();

      // NEW: Hide grid and price/button on reset/collection change
      $tabContent.find('.letters').hide();
      $tabContent.find('.price-and-button-wrapper').hide();
    } else if (tab === 'set') {
      $tabContent.find('.letter-set-type').html('<option value="">Select Set Type</option>').attr('disabled', true);
      $tabContent.find('.error-set, .error-color, .error-height').hide();
    }
  }

  // Description Population (Parameterized for handle)
  function populateDescription(handle) {
    var data = masterCollectionsData[handle];
    if (!data) return;

    // === MODIFICATION ===
    // Variables are defined here
    var imageHtml = data.image ? '<img src="' + data.image + '" alt="' + (data.title || '') + '" class="collection-image-master">' : '';
    var titleHtml = '<h3 class="collection-title-master">' + (data.title || '') + '</h3>';

    var mainDesc = (data.main_description || '').replace(/<h3>Starting at only/g, '<h3 class="desc-price-highlight-master">Starting at only')
      .replace(/<ul class="two-cols">/g, '<ul class="two-cols desc-price-list-master">');

    var $tempDOM = $('<div>').html(data.full_description || '');

    var $specsEl = $tempDOM.find('#content-specs');
    var specsHtml = $specsEl.prop('outerHTML') || '';

    var $detailsEl = $tempDOM.find('#content-details');
    var $detailsClone = $detailsEl.clone();
    $detailsClone.find('#content-specs').remove();
    var detailsHtml = $detailsClone.prop('outerHTML') || '';

    var has_details = detailsHtml.length > 0;
    var has_specs = specsHtml.length > 0;
    // === END MODIFICATION ===


    var html = '<div class="tabs-container-master">';
    html += '<div class="tabs-nav-master">';
    html += '<div class="tab-link-master active" data-tab="tab-description-master">DESCRIPTION</div>';
    if (has_details) html += '<div class="tab-link-master" data-tab="tab-details-master">DETAILS</div>';
    if (has_specs) html += '<div class="tab-link-master" data-tab="tab-specs-master">USE WITH</div>';
    html += '</div>';

    html += '<div class="tab-content-master">';
    html += '<div id="tab-description-master" class="tab-pane-master active">';

    // === MODIFICATION ===
    // Image and Title removed from this line
    html += '<div class="tab-content-mobile">' + mainDesc + '</div>';
    // === END MODIFICATION ===

    html += '</div>';

    if (has_details) {
      html += '<div id="tab-details-master" class="tab-pane-master">';
      html += '<div class="tab-content-mobile">' + detailsHtml + '</div>';
      html += '</div>';
    }
    if (has_specs) {
      html += '<div id="tab-specs-master" class="tab-pane-master">';
      html += '<h3>Use With</h3>';
      html += '<div class="tab-content-mobile">' + specsHtml + '</div>';
      html += '</div>';
    }
    html += '</div></div>';

    var targetSelector = '.description-column-master.description-column-' + currentActiveTab;
    $(targetSelector).html(html);

    // === MODIFICATION ===
    // New lines to inject image/title into the form column
    var formTargetSelector = '#tab-content-' + currentActiveTab + ' .form-image-title-placeholder';
    $(formTargetSelector).html(imageHtml + titleHtml);
    // === END MODIFICATION ===

    var parentHandle = data.parent_handle || '';
    $(targetSelector + ' a[href*="NRS-Know-Your-Inventory-Form.pdf"]').addClass('desc-styled-link-master');
    if (parentHandle) $(targetSelector + ' a[href*="' + parentHandle + '?type=set"]').addClass('desc-styled-link-master');
  }

  // Height Dropdown Population (Parameterized for handle and tab)
  function populateHeightDropdown(handle, tab) {
    var data = masterCollectionsData[handle];
    var $heightSelect = $('#tab-content-' + tab + ' .letter-height');
    $heightSelect.html('<option value="">Select Height</option>');
    if (!data || !data.height_obj) return;
    var heights = Object.keys(data.height_obj).sort(function (a, b) {
      return parseFloat(a.replace(/[^\d.-]/g, '')) - parseFloat(b.replace(/[^\d.-]/g, ''));
    });
    heights.forEach(function (h) {
      $heightSelect.append('<option value="' + h + '">' + h + '</option>');
    });
  }

  // Individual Form Updates
  function updateCharactersIndv() {
    var height = $('#tab-content-indv .letter-height').val();
    var color = $('#tab-content-indv .letter-color').val();
    $('#tab-content-indv .letter').hide();
    if (!height || !color || !currentCollectionHandleIndv) return;
    var key = height + "||" + color;
    var avail = masterCollectionsData[currentCollectionHandleIndv].height_color_obj[key] || [];
    avail.forEach(function (letterStr) {
      $('#tab-content-indv input[name="' + letterStr + '"]').closest('.letter').show();
    });
  }

  function updatePriceIndv() {
    var height = $('#tab-content-indv .letter-height').val();
    var color = $('#tab-content-indv .letter-color').val();
    var total = 0;
    if (!height || !color || !currentCollectionHandleIndv) {
      $('#tab-content-indv .price').text('$0.00');
      return;
    }
    var baseKey = height + "||" + color + "||";
    $('#tab-content-indv .letters input:visible').each(function () {
      var qty = parseInt($(this).val()) || 0;
      if (qty > 0) {
        var letterStr = $(this).attr('name');
        var fullKey = baseKey + letterStr;
        var price = masterCollectionsData[currentCollectionHandleIndv].price_obj[fullKey] || 0;
        total += qty * price;
      }
    });
    $('#tab-content-indv .price').text('$' + total.toFixed(2));
  }

  // Set Form Updates
  // --- Set Form Updates (Refactored: Height -> Set -> Color) ---

  // 1. Triggered by HEIGHT change. Populates SET TYPE.
  function updateSetDropdownSet() {
    var height = $('#tab-content-set .letter-height').val();
    var $setSelect = $('#tab-content-set .letter-set-type');
    var $colorSelect = $('#tab-content-set .letter-color');

    // Reset downstream inputs
    $setSelect.html('<option value="">Select Set Type</option>').attr('disabled', true);
    $colorSelect.html('<option value="">Select Color</option>').attr('disabled', true);

    // Reset Price/Button
    $('#tab-content-set .price').text('$0.00').removeData('variant-id');
    $('#tab-content-set .add-btn').attr('disabled', true);
    $('#tab-content-set .sold-out-btn').hide();
    $('#tab-content-set .error-set, .error-color, .error-height').hide();

    if (height && currentCollectionHandleSet) {
      // Direct lookup from Liquid pre-calculated map
      // Data is pre-filtered for availability in Liquid
      var sets = masterCollectionsData[currentCollectionHandleSet].height_set_obj[height] || [];
      sets.sort();

      sets.forEach(function (s) {
        $setSelect.append('<option value="' + s + '">' + s + '</option>');
      });
      $setSelect.attr('disabled', false);
    }
  }

  // 2. Triggered by SET TYPE change. Populates COLOR.
  function updateColorDropdownSet() {
    var height = $('#tab-content-set .letter-height').val();
    var setType = $('#tab-content-set .letter-set-type').val();
    var $colorSelect = $('#tab-content-set .letter-color');

    $colorSelect.html('<option value="">Select Color</option>').attr('disabled', true);
    $('#tab-content-set .price').text('$0.00').removeData('variant-id');
    $('#tab-content-set .add-btn').attr('disabled', true);
    $('#tab-content-set .sold-out-btn').hide();

    if (height && setType && currentCollectionHandleSet) {
      var key = height + "||" + setType;
      // Retrieve variants from Liquid map (already filtered)
      var variants = (masterCollectionsData[currentCollectionHandleSet].set_color_obj || {})[key] || [];

      // Sort by Color Name
      variants.sort(function (a, b) { return a.color.localeCompare(b.color); });

      variants.forEach(function (item) {
        // Since data is pre-filtered, we assume all items here are available.
        // We attach the variant ID and Price directly to the option.
        $colorSelect.append('<option value="' + item.id + '" data-price="' + item.price.toFixed(2) + '">' + item.color + '</option>');
      });
      $colorSelect.attr('disabled', false);
    }
  }

  function updatePriceAndButtonSet() {
    var $priceEl = $('#tab-content-set .price');
    var $addButton = $('#tab-content-set .add-btn');
    var $soldOutButton = $('#tab-content-set .sold-out-btn');

    var selectedOption = $('#tab-content-set .letter-set-type option:selected');
    if (selectedOption.length && selectedOption.val()) {
      var price = parseFloat(selectedOption.data('price')) || 0;
      $priceEl.text('$' + price.toFixed(2)).data('variant-id', selectedOption.val());

      if (selectedOption.hasClass('sold-out')) {
        $addButton.hide().attr('disabled', true);
        $soldOutButton.show();
      } else {
        $addButton.show().removeAttr('disabled');
        $soldOutButton.hide();
      }
    } else {
      $priceEl.text('$0.00').removeData('variant-id');
      $addButton.attr('disabled', true);
      $soldOutButton.hide();
    }
  }

  // Master Collection Selection Function
  function selectCollectionMaster(parentH, inventoryH) {
    var tab = currentActiveTab;
    var data = masterCollectionsData[inventoryH];
    if (!data || !data.products_available) return;

    if (tab === 'indv') {
      currentCollectionHandleIndv = inventoryH;
    } else {
      currentCollectionHandleSet = inventoryH;
    }
    currentParentHandle = parentH;

    $('.collection-selector-item-master').removeClass('active');
    $('.collection-selector-item-master[data-inventory-handle="' + inventoryH + '"]').addClass('active');

    resetFormUI(tab);
    populateDescription(inventoryH);
    populateHeightDropdown(inventoryH, tab);
    updateAvailabilityButtons(data);
    updateRedNoteVisibility(inventoryH, tab);
  }

  function updateRedNoteVisibility(handle, tab) {
    if (!handle) return;
    var data = masterCollectionsData[handle];
    var $redNote = $('#tab-content-' + tab + ' .color-note');
    var hasRed = false;

    if (data) {
      // Check Individual data keys ("H||C")
      if (data.height_color_obj) {
        for (var key in data.height_color_obj) {
          if (key.toUpperCase().indexOf('RED') !== -1) {
            hasRed = true;
            break;
          }
        }
      }
      // Check Set data keys ("H||C")
      if (!hasRed && data.color_set_obj) {
        for (var key in data.color_set_obj) {
          if (key.toUpperCase().indexOf('RED') !== -1) {
            hasRed = true;
            break;
          }
        }
      }
    }

    if (hasRed) {
      $redNote.show();
    } else {
      $redNote.hide();
    }
  }

  function updateAvailabilityButtons(data) {
    var $addButton = $('#tab-content-' + currentActiveTab + ' .add-btn');
    var $soldOutButton = $('#tab-content-' + currentActiveTab + ' .sold-out-btn');

    if (data.products_available) {
      $addButton.show();
      $soldOutButton.hide();
    } else {
      $addButton.hide();
      $soldOutButton.show();
    }
  }

  // Event Handlers (Grouped by type)
  // Collection Selector Clicks
  $('.collection-selector-grid-master').on('click', '.collection-selector-item-master', function () {
    var parentH = $(this).data('parent-handle');
    var inventoryH = $(this).data('inventory-handle');
    selectCollectionMaster(parentH, inventoryH);
  });

  // Top-Level Tab Switching
  $('.top-level-tabs .tab-link-master').on('click', function () {
    var newTabName = $(this).data('tab-name');
    if (newTabName === currentActiveTab) return;

    currentActiveTab = newTabName;

    $('.tabs-nav-form-master .tab-link-master').removeClass('active');
    $(this).addClass('active');

    $('.tab-content-master').removeClass('active');
    $('#tab-content-' + newTabName).addClass('active');

    // Check if this tab already has a selected collection
    var currentHandle = (newTabName === 'indv') ? currentCollectionHandleIndv : currentCollectionHandleSet;

    if (!currentHandle) {
      // No collection selected yet - auto-load first collection
      var newGrid = $('.collection-selector-grid-' + newTabName);
      var firstItem = newGrid.find('.collection-selector-item-master').first();

      if (firstItem.length) {
        firstItem.trigger('click');
      }
    } else {
      // Collection already selected - ensure UI reflects current state
      $('.collection-selector-item-master').removeClass('active');
      $('.collection-selector-item-master[data-inventory-handle="' + currentHandle + '"]').addClass('active');

      // Repopulate description and form for current selection
      populateDescription(currentHandle);
      populateHeightDropdown(currentHandle, newTabName);
      updateRedNoteVisibility(currentHandle, newTabName);
    }
  });

  // Individual Form Events
  $('#tab-content-indv').on('change', '.letter-height', function () {
    var h = $(this).val();
    var $colorSelect = $('#tab-content-indv .letter-color');
    $colorSelect.html('<option value="">Select Color</option>');

    if (h && currentCollectionHandleIndv) {
      var colors = masterCollectionsData[currentCollectionHandleIndv].height_obj[h] || [];
      colors.sort().forEach(function (c) {
        $colorSelect.append('<option value="' + c + '">' + c + '</option>');
      });
      $colorSelect.attr('disabled', false);
    } else {
      $colorSelect.attr('disabled', true);
    }
    updateCharactersIndv();
    updatePriceIndv();

    // NEW: Hide grid and price/button when height changes (color gets reset)
    $('#tab-content-indv .letters').hide();
    $('#tab-content-indv .price-and-button-wrapper').hide();
  });

  $('#tab-content-indv').on('change', '.letter-color', function () {
    updateCharactersIndv();
    updatePriceIndv();

    // NEW: Show grid and price/button only when a color is selected
    var colorVal = $(this).val();
    if (colorVal) {
      $('#tab-content-indv .letters').show();
      $('#tab-content-indv .price-and-button-wrapper').show();
    } else {
      $('#tab-content-indv .letters').hide();
      $('#tab-content-indv .price-and-button-wrapper').hide();
    }
  });

  $('#tab-content-indv').on('input', '.letters input', function () {
    updatePriceIndv();
  });

  // Individual Form Submission
  $('.letters-form.individual').on('submit', function (e) {
    e.preventDefault();
    $('#tab-content-indv .error-chars, .error-color').hide();
    if (!currentCollectionHandleIndv) return;
    var height = $('#tab-content-indv .letter-height').val();
    var color = $('#tab-content-indv .letter-color').val();
    if (!height || !color) {
      $('#tab-content-indv .error-color').show();
      return;
    }
    var items = [];
    var hasItems = false;
    var baseKey = height + "||" + color + "||";
    $('#tab-content-indv .letters input:visible').each(function () {
      var qty = parseInt($(this).val()) || 0;
      if (qty > 0) {
        hasItems = true;
        var letterStr = $(this).attr('name');
        var fullKey = baseKey + letterStr;
        var variantId = masterCollectionsData[currentCollectionHandleIndv].variant_obj[fullKey];
        if (variantId) items.push({ id: variantId, quantity: qty });
      }
    });
    if (!hasItems) {
      $('#tab-content-indv .error-chars').show();
      return;
    }
    $.post('/cart/add.js', { items: items })
      .done(function () { window.location = '/cart'; })
      .fail(function () { alert('Error adding items to cart. Please try again.'); });
  });

  // Set Form Events
  // --- Set Form Events (Reordered) ---
  $('#tab-content-set').on('change', '.letter-height', function () {
    updateSetDropdownSet();
  });

  // CHANGED: Set Type now triggers Color update
  $('#tab-content-set').on('change', '.letter-set-type', function () {
    updateColorDropdownSet();
  });

  // CHANGED: Color now triggers Price update
  $('#tab-content-set').on('change', '.letter-color', function () {
    updatePriceAndButtonSet();
  });

  // Set Form Submission
  $('.letters-form.set').on('submit', function (e) {
    e.preventDefault();
    $('#tab-content-set .error-set, .error-color, .error-height').hide();

    var height = $('#tab-content-set .letter-height').val();
    var color = $('#tab-content-set .letter-color').val();
    var variantId = $('#tab-content-set .price').data('variant-id');

    if (!height) {
      $('#tab-content-set .error-height').show();
      return;
    }
    if (!color) {
      $('#tab-content-set .error-color').show();
      return;
    }
    if (!variantId) {
      $('#tab-content-set .error-set').show();
      return;
    }

    var items = [{ id: variantId, quantity: 1 }];

    $.post('/cart/add.js', { items: items })
      .done(function () { window.location = '/cart'; })
      .fail(function () { alert('Error adding set to cart. Please try again.'); });
  });

  // Description Tab Switching (Shared)
  $('.description-column-master').on('click', '.tab-link-master', function () {
    var tab = $(this).data('tab');
    var activeColumn = '.description-column-master.description-column-' + currentActiveTab;

    $(this).closest('.tabs-nav-master').find('.tab-link-master').removeClass('active');
    $(this).addClass('active');

    $(activeColumn).find('.tab-pane-master').removeClass('active');
    $(activeColumn).find('#' + tab).addClass('active');
  });

  // Initialization (matching source lines 752-766, without URL params per Q1)
  var isCollectionMode = $('.page-order-page-master').hasClass('collection-mode');

  if (isCollectionMode) {
    // Collection page initialization - reuse master functions (Q3: Option B)
    // Find which collection has data and select it
    var collectionHandle = null;
    for (var handle in masterCollectionsData) {
      if (masterCollectionsData.hasOwnProperty(handle)) {
        collectionHandle = handle;
        break; // Only one collection on collection pages
      }
    }

    if (collectionHandle && masterCollectionsData[collectionHandle]._dataReady) {
      var parentH = collectionHandle.replace(/-indv$/, '').replace(/-set$/, '');
      var startTab = collectionHandle.includes('-set') ? 'set' : 'indv';

      // Trigger correct tab
      $('.top-level-tabs .tab-link-master[data-tab-name="' + startTab + '"]').trigger('click');

      // Select the collection using master function
      selectCollectionMaster(parentH, collectionHandle);
    } else if (collectionHandle) {
      // Data not ready yet, wait and.
      setTimeout(function () {
        if (masterCollectionsData[collectionHandle]._dataReady) {
          var parentH = collectionHandle.replace(/-indv$/, '').replace(/-set$/, '');
          var startTab = collectionHandle.includes('-set') ? 'set' : 'indv';
          $('.top-level-tabs .tab-link-master[data-tab-name="' + startTab + '"]').trigger('click');
          selectCollectionMaster(parentH, collectionHandle);
        }
      }, 100);
    }
  } else {
    // Master section initialization - trigger individual tab and select first collection
    var firstItem = $('.collection-selector-grid-indv').find('.collection-selector-item-master').first();
    var startHandle = null;

    if (firstItem.length) {
      startHandle = firstItem.data('inventory-handle');
    }

    if (startHandle) {
      var parentH = startHandle.replace(/-indv$/, '').replace(/-set$/, '');
      $('.top-level-tabs .tab-link-master[data-tab-name="indv"]').trigger('click');
      selectCollectionMaster(parentH, startHandle);
    }
  }

});