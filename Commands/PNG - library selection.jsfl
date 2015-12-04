fl.runScript(fl.configURI + "Shporter/png_exporter.jsfl");
fl.runScript(fl.configURI + "Shporter/logger.jsfl");

init();

function init()
{
	Logger.log(">>> Export selected library items to PNGs: ");

	var exportDialog = fl.getDocumentDOM().xmlPanel(fl.configURI + "Commands/mobitile-export-library-dialog.xml");

	if (exportDialog.dismiss == "accept") // user confirms dialog
	{
		var directory = exportDialog.directory;
		var scaleFactor = parseFloat(exportDialog.scaleFactor);
		var selectedOnly = exportDialog.selectedOnly == "true";

		fl.trace("directory: " + exportDialog.directory);
		fl.getDocumentDOM().addDataToDocument("org.github.mobitile.shporter.dialog.DIRECTORY", "string", directory);

		fl.trace("scaleFactor: " + exportDialog.scaleFactor);
		fl.getDocumentDOM().addDataToDocument("org.github.mobitile.shporter.dialog.SCALE_FACTOR", "double", scaleFactor);

		fl.trace("selectedOnly: " + exportDialog.selectedOnly);
		fl.getDocumentDOM().addDataToDocument("org.github.mobitile.shporter.dialog.SELECTED_ONLY", "string", selectedOnly);
	}
	else // user canceled dialog
	{
		return;
	}

	var doc = fl.getDocumentDOM();

	var exporter = new PNGExporter(doc, directory, scaleFactor);

	var itemsToExport = selectedOnly ? doc.library.getSelectedItems() : doc.library.items;

	if (itemsToExport == null || itemsToExport.length == 0)
	{
		alert("Nothing to Export");

		return;
	}
	
	for (var i = 0; i < itemsToExport.length; i++)
	{
		var item = itemsToExport[i];
		var fileName = item.name.replace(/^(.+\/)/igm, "").replace(/\W+/ig, "_");
		exporter.exportItem(item, item.name);
	}
	
	Logger.trace();
}