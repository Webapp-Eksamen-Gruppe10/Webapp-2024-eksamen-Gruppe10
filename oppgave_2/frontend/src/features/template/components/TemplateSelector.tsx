import { Template } from "../lib/schema";


interface TemplateSelectorProps {
  templates?: Template[];
}

export default function TemplateSelector({ templates = [] }: TemplateSelectorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 p-6 max-w-5xl mx-auto">
      {/* Create Template Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Arrangement mal</h2>
        <div>
          <h3 className="font-medium mb-4">Lag ny mal</h3>
          <div className="space-y-4">
            {/* Template Name */}
            <div>
              <label htmlFor="templateName" className="block font-medium mb-1">
                Mal navn
              </label>
              <input
                id="templateName"
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* No Duplicate Events */}
            <div className="flex items-center space-x-2">
              <input id="noDuplicateEvents" type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded" />
              <label htmlFor="noDuplicateEvents" className="font-medium">
                Ingen andre kan ha arrangement på samme dag
              </label>
            </div>

            {/* Template Description */}
            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Beskrivelse
              </label>
              <textarea
                id="description"
                className="w-full border border-gray-300 rounded px-3 py-2 min-h-[100px]"
              />
            </div>

            {/* Weekdays */}
            <div>
              <label htmlFor="weekdays" className="block font-medium mb-1">
                Begrenset ukedager
              </label>
              <select id="weekdays" className="w-full border border-gray-300 rounded px-3 py-2">
                <option value="">Velg dag</option>
                <option value="monday">Mandag</option>
                <option value="tuesday">Tirsdag</option>
                <option value="wednesday">Onsdag</option>
                <option value="thursday">Torsdag</option>
                <option value="friday">Fredag</option>
                <option value="saturday">Lørdag</option>
                <option value="sunday">Søndag</option>
              </select>
            </div>

            {/* Additional Options */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input id="isPrivate" type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded" />
                <label htmlFor="isPrivate" className="font-medium">
                  Privat arrangement
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input id="limitedSpace" type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded" />
                <label htmlFor="limitedSpace" className="font-medium">
                  Begrenset plass
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input id="fixedPrice" type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded" />
                <label htmlFor="fixedPrice" className="font-medium">
                  Fast pris
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input id="isFree" type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded" />
                <label htmlFor="isFree" className="font-medium">
                  Gratis arrangement
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input id="enableWaitlist" type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded" />
                <label htmlFor="enableWaitlist" className="font-medium">
                  Aktiver venteliste
                </label>
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Lag mal
          </button>
        </div>
      </div>

      {/* Existing Templates Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Eksisterende mal</h2>
        <div className="min-h-[200px]">
          {templates.length === 0 ? (
            <p className="text-gray-500">Ingen mal laget enda</p>
          ) : (
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  className="w-full border border-gray-300 rounded px-4 py-2 text-left hover:bg-gray-100"
                >
                  {template.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="w-full border border-gray-300 rounded px-4 py-2 hover:bg-gray-100">
          Hopp over mal
        </button>
      </div>
    </div>
  );
}
